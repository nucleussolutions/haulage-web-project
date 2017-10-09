import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ForwarderInfo} from './forwarderInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment';

@Injectable()
export class ForwarderInfoService {


  constructor(private http: Http) {
  }

  list(token: string, apiKey: string): Observable<ForwarderInfo[]> {
    let subject = new Subject<ForwarderInfo[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });


    this.http.get(environment.serverUrl + '/forwarderInfo', options)
      .map((r: Response) => r.json())
        .catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new ForwarderInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token : string, apiKey: string): Observable<ForwarderInfo> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    return this.http.get(environment.serverUrl + '/forwarderInfo/'+id, options)
      .map((r: Response) => new ForwarderInfo(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  save(forwarderInfo: ForwarderInfo, token : string, apiKey: string): Observable<ForwarderInfo> {
    const requestOptions = new RequestOptions();
    if (forwarderInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/forwarderInfo/' + forwarderInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/forwarderInfo';
    }
    requestOptions.body = JSON.stringify(forwarderInfo);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token' : token,
      'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new ForwarderInfo(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  destroy(forwarderInfo: ForwarderInfo, token : string, apiKey : string): Observable<boolean> {
    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    return this.http.delete(environment.serverUrl + '/forwarderInfo/' + forwarderInfo.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}