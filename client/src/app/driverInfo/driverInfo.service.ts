import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DriverInfo } from './driverInfo';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { environment } from "../../environments/environment";

@Injectable()
export class DriverInfoService {


  constructor(private http: Http) {
  }

  list(token: string, apiKey: string): Observable<DriverInfo[]> {
    let subject = new Subject<DriverInfo[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });


    this.http.get(environment.serverUrl + '/driverInfo', options)
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new DriverInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<DriverInfo> {
    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });
    return this.http.get(environment.serverUrl + '/driverInfo/' + id, options)
      .map((r: Response) => new DriverInfo(r.json()));
  }

  save(driverInfo: DriverInfo, token: string, apiKey: string): Observable<DriverInfo> {
    const requestOptions = new RequestOptions();
    if (driverInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/driverInfo/' + driverInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/driverInfo';
    }
    requestOptions.body = JSON.stringify(driverInfo);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new DriverInfo(r.json()));
  }

  destroy(driverInfo: DriverInfo, token: string, apiKey: string): Observable<boolean> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.delete(environment.serverUrl + '/driverInfo/' + driverInfo.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}