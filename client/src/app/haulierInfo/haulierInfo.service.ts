import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HaulierInfo} from './haulierInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HaulierInfoService {

  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey: string): Observable<HaulierInfo[]> {
    let subject = new Subject<HaulierInfo[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/haulierInfo', {
      headers: headers
    })
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new HaulierInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<HaulierInfo> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.get(environment.serverUrl + '/haulierInfo/' + id, {
      headers: headers
    })
      .map((r: Response) => new HaulierInfo(r)).catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        } else if (err.status === 500) {
          return Observable.throw('Internal server error');
        }
      });
  }


  save(haulierInfo: HaulierInfo, token: string, apiKey: string): Observable<HaulierInfo> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;

    if (haulierInfo.id) {
      requestMethodStr = 'PUT';
      // requestOptions.method = RequestMethod.Put;
      url = environment.serverUrl + '/haulierInfo/' + haulierInfo.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/haulierInfo';
    }
    let body = JSON.stringify(haulierInfo);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new HaulierInfo(r.json()));
  }

  destroy(haulierInfo: HaulierInfo, token: string, apiKey: string): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/haulierInfo/' + haulierInfo.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}