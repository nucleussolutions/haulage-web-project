import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HaulierInfo} from './haulierInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class HaulierInfoService {

  constructor(private http: Http) {
  }

  list(token : string, apiKey: string): Observable<HaulierInfo[]> {
    let subject = new Subject<HaulierInfo[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    this.http.get(environment.serverUrl + '/haulierInfo', options)
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new HaulierInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token : string, apiKey : string): Observable<HaulierInfo> {
    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });
    return this.http.get(environment.serverUrl + '/haulierInfo/'+id, options)
      .map((r: Response) => new HaulierInfo(r.json()));
  }



  save(haulierInfo: HaulierInfo, token: string, apiKey : string): Observable<HaulierInfo> {
    const requestOptions = new RequestOptions();
    if (haulierInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/haulierInfo/' + haulierInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/haulierInfo';
    }
    requestOptions.body = JSON.stringify(haulierInfo);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token' : token,
      'apiKey' : apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new HaulierInfo(r.json()));
  }

  destroy(haulierInfo: HaulierInfo, token : string, apiKey : string): Observable<boolean> {
    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });
    return this.http.delete(environment.serverUrl + '/haulierInfo/' + haulierInfo.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}