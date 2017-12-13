import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Location} from './location';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {int} from "aws-sdk/clients/datapipeline";

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, page: number): Observable<Location[]> {
    let subject = new Subject<Location[]>();
    let offset = page * 10;

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('max', '10');

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/location', {
      headers: headers,
      params: params
    })
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Location> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/location/' + id, {
      headers: headers
    })
      .map((r: Response) => new Location(r));
  }

  getByType(type: string, userObject: any): Observable<Location> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/locationByType/' + type, {
      headers: headers
    })
      .map((r: Response) => new Location(r));
  }

  save(location: Location, userObject: any): Observable<Location> {
    let requestMethodStr;
    let url;
    if (location.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/location/' + location.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/location';
    }
    let body = JSON.stringify(location);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Location(r));
  }

  destroy(location: Location, userObject: any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/location/' + location.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
    });

    this.http.get(environment.serverUrl + '/location/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });
    return subject.asObservable();
  }

}