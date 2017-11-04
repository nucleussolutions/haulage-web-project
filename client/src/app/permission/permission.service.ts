import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Permission } from './permission';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class PermissionService {

  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey: string): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/permission', {
      headers: headers
    })
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

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.get(environment.serverUrl + '/permission/' + id, {
      headers: headers
    })
      .map((r: Response) => new Permission(r.json()));
  }

  getByUserId(userObject: any): Observable<Permission> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/api/permission?userId=' + userObject.uid, {
      headers: headers
    }).subscribe(response => {
      console.log('getByUserId response '+response);
    });

    return this.http.get(environment.serverUrl + '/api/permission?userId=' + userObject.uid, {
      headers: headers
    }).map((r: Response) => new Permission(r.json()));
  }

  save(permission: Permission, token: string, apiKey: string): Observable<Permission> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;

    let url;


    if (permission.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/permission/' + permission.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/permission';
    }
    let body = JSON.stringify(permission);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  destroy(permission: Permission, token: string, apiKey: string): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/permission/' + permission.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}