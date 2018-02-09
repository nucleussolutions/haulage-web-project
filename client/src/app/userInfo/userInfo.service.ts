import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserInfo} from './userInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UserInfoService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<UserInfo[]> {
    let subject = new Subject<UserInfo[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/userInfo', {
      headers: headers,
      params: params
    })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  listHauliers(userObject: any, offset: number): Observable<UserInfo[]> {
    let subject = new Subject<UserInfo[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/userInfo/haulier', {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }

  listForwarders(userObject: any, offset: number): Observable<UserInfo[]> {
    let subject = new Subject<UserInfo[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/userInfo/forwarder', {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<UserInfo> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/userInfo/'+id, {
      headers: headers
    })
      .map((r: Response) => new UserInfo(r));
  }

  getByUserId(userObject: any): Observable<UserInfo> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/userInfo/me', {
      headers: headers
    })
        .map((r: Response) => new UserInfo(r));
  }

  save(userInfo: UserInfo, userObject: any): Observable<UserInfo> {

    let requestMethodStr;
    let url;

    if (userInfo.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/userInfo/' + userInfo.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/userInfo';
    }
    let body = JSON.stringify(userInfo);
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
      .map((r: Response) => new UserInfo(r));
  }

  destroy(userInfo: UserInfo): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/userInfo/' + userInfo.id).map((res: Response) => res.ok).catch(() => {
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

    this.http.get(environment.serverUrl + '/userInfo/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });
    return subject.asObservable();
  }

  countHauliers(userObject: any){
    let subject = new Subject<number>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    this.http.get(environment.serverUrl + '/userInfo/haulier/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });
    return subject.asObservable();
  }

  countForwarders(userObject:any){
    let subject = new Subject<number>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    this.http.get(environment.serverUrl + '/userInfo/forwarder/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });
    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<any[]> {
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/userInfo?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  searchHauliers(term: string, userObject: any): Observable<any[]> {
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/userInfo/haulier?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  searchForwarders(term: string, userObject: any): Observable<any[]> {
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/userInfo/forwarder?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}