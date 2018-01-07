import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ForwarderInfo} from './forwarderInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ForwarderInfoService {


  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<ForwarderInfo[]> {
    let subject = new Subject<ForwarderInfo[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/forwarderInfo', {
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

  get(id: number, userObject:any): Observable<ForwarderInfo> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/forwarderInfo/' + id, {
      headers: headers
    })
      .map((r: Response) => new ForwarderInfo(r));
  }

  getByUserId(userId : string, userObject: any){
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl+'/forwarderInfo/userId/'+userId, {
      headers: headers
    }).map((r: Response) => new ForwarderInfo(r));
  }

  save(forwarderInfo: ForwarderInfo, userObject: any): Observable<ForwarderInfo> {
    let requestMethodStr;
    let url;
    if (forwarderInfo.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/forwarderInfo/' + forwarderInfo.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/forwarderInfo';
    }
    let body = JSON.stringify(forwarderInfo);
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
      .map((r: Response) => new ForwarderInfo(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  destroy(forwarderInfo: ForwarderInfo, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.delete(environment.serverUrl + '/forwarderInfo/' + forwarderInfo.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number>{
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });


    this.http.get(environment.serverUrl+ '/forwarderInfo/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<any[]>{
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl+ '/forwarderInfo?term='+term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}