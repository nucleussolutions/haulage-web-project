import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Permission } from './permission';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class PermissionService {

  constructor(private http: Http) {
  }

  list(token: string, apiKey: string): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    this.http.get(environment.serverUrl + '/permission', options)
      .map((r: Response) => r.json())
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Permission(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Permission> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    // this.http.get(environment.serverUrl + '/permission/' + id, options).subscribe(response => {
    //   console.log('permission '+response);
    // });

    return this.http.get(environment.serverUrl + '/permission/' + id, options)
      .map((r: Response) => new Permission(r.json()));
  }

  getByUserId(userId: string, token: string, apiKey: string): Observable<Permission> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

      this.http.get(environment.serverUrl + '/api/permission?userId=' + userId, options).subscribe(response => {
        console.log('getByUserId response '+response);
      });

    return this.http.get(environment.serverUrl + '/api/permission?userId=' + userId, options).map((r: Response) => new Permission(r.json()));
  }

  save(permission: Permission, token: string, apiKey: string): Observable<Permission> {
    const requestOptions = new RequestOptions();
    if (permission.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/permission/' + permission.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/permission';
    }
    requestOptions.body = JSON.stringify(permission);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Permission(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  destroy(permission: Permission, token: string, apiKey: string): Observable<boolean> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.delete(environment.serverUrl + '/permission/' + permission.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}