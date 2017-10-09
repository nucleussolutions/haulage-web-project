import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Location} from './location';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment';

@Injectable()
export class LocationService {

  constructor(private http: Http) {
  }

  list(token, apiKey): Observable<Location[]> {
    let subject = new Subject<Location[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    this.http.get(environment.serverUrl + '/location', options)
      .map((r: Response) => r.json())
        .catch(err => {
            subject.error(err);
            return subject.asObservable();
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Location(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token : string, apiKey : string): Observable<Location> {

      let headers = new Headers({
          'token': token,
          'apiKey': apiKey
      });

      let options = new RequestOptions({
          headers: headers
      });

    return this.http.get(environment.serverUrl + '/location/'+id, options)
      .map((r: Response) => new Location(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw(new Error('Unauthorized'));
            }else if(err.status === 500){
                return Observable.throw(new Error('Internal server error'));
            }
        });
  }

  save(location: Location, token : string, apiKey : string): Observable<Location> {
    const requestOptions = new RequestOptions();
    if (location.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/location/' + location.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/location';
    }
    requestOptions.body = JSON.stringify(location);
    requestOptions.headers = new Headers({
        "Content-Type": "application/json",
        'token' : token,
        'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Location(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  destroy(location: Location, token:string, apiKey : string): Observable<boolean> {

      let headers = new Headers({
          'token': token,
          'apiKey': apiKey
      });

      let options = new RequestOptions({
          headers : headers
      });


      return this.http.delete(environment.serverUrl + '/location/' + location.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}