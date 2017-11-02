import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ForwarderInfo} from './forwarderInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ForwarderInfoService {


  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey: string): Observable<ForwarderInfo[]> {
    let subject = new Subject<ForwarderInfo[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/forwarderInfo', {
      headers: headers
    }).map((r: Response) => r.json())
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new ForwarderInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<ForwarderInfo> {

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.get(environment.serverUrl + '/forwarderInfo/' + id, {
      headers: headers
    })
      .map((r: Response) => new ForwarderInfo(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  save(forwarderInfo: ForwarderInfo, token: string, apiKey: string): Observable<ForwarderInfo> {
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
      'token': token,
      'apiKey': apiKey
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

  destroy(forwarderInfo: ForwarderInfo, token: string, apiKey: string): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/forwarderInfo/' + forwarderInfo.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}