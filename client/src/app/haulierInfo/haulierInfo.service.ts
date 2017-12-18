import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HaulierInfo} from './haulierInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class HaulierInfoService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<HaulierInfo[]> {
    let subject = new Subject<HaulierInfo[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/haulierInfo', {
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

  get(id: number, userObject: any): Observable<HaulierInfo> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/haulierInfo/' + id, {
      headers: headers
    })
      .map((r: Response) => new HaulierInfo(r));
  }


  save(haulierInfo: HaulierInfo, userObject: any): Observable<HaulierInfo> {

    let requestMethodStr;
    let url;

    if (haulierInfo.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/haulierInfo/' + haulierInfo.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/haulierInfo';
    }
    let body = JSON.stringify(haulierInfo);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new HaulierInfo(r));
  }

  destroy(haulierInfo: HaulierInfo, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/haulierInfo/' + haulierInfo.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/haulierInfo/count', {
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
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl+ '/haulierInfo?term='+term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}