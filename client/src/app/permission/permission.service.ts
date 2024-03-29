import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Permission} from './permission';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Company} from "../company/company";

@Injectable()
export class PermissionService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();
    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/permission', {
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

  get(id: number, userObject: any): Observable<Permission> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/permission/' + id, {
      headers: headers
    })
        .map((r: Response) => new Permission(r));
  }


  //todo permissions should be cached so that it can be reused without calling the server again and again
  getByUserId(userObject: any): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/permission/userId', {
      headers: headers,
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

  getByCompanyName(userObject: any, companyName: string) : Observable<Permission[]> {
    let subject = new Subject<Permission[]>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/permission/companyname/'+companyName, {
      headers: headers,
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

  save(permission: Permission, userObject: any): Observable<Permission> {
    let requestMethodStr;
    let url;
    if (permission.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/permission/' + permission.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/permission';
    }
    let body = JSON.stringify(permission);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
        .map((r: Response) => new Permission(r));
  }

  destroy(permission: Permission, userObject: any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.delete(environment.serverUrl + '/permission/' + permission.id, {
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
      'userId': userObject.uid
    });
    this.http.get(environment.serverUrl + '/permission/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/permission?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}