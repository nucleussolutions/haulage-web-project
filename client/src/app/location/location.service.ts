import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Location} from './location';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
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
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Location(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Location> {
    return this.http.get(environment.serverUrl + '/location/'+id)
      .map((r: Response) => new Location(r.json()));
  }

  save(location: Location): Observable<Location> {
    const requestOptions = new RequestOptions();
    if (location.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/location/' + location.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/location';
    }
    requestOptions.body = JSON.stringify(location);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Location(r.json()));
  }

  destroy(location: Location): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/location/' + location.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}