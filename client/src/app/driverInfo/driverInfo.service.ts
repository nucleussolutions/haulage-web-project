import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DriverInfo} from './driverInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {int} from "aws-sdk/clients/datapipeline";
import {Job} from "../job/job";

@Injectable()
export class DriverInfoService {


  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<DriverInfo[]> {
    let subject = new Subject<DriverInfo[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('max', '10');
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/driverInfo', {
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

  get(id: number, userObject: any): Observable<DriverInfo> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/driverInfo/' + id, {
      headers: headers
    })
      .map((r: Response) => new DriverInfo(r));
  }

  save(driverInfo: DriverInfo, userObject: any): Observable<DriverInfo> {
    let requestMethodStr;
    let url;

    if (driverInfo.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/driverInfo/' + driverInfo.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/driverInfo';
    }
    let body = JSON.stringify(driverInfo);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new DriverInfo(r));
  }

  destroy(driverInfo: DriverInfo, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/driverInfo/' + driverInfo.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number>{
    let subject = new Subject<number>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl+ '/driverInfo/count', {
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

    this.http.get(environment.serverUrl+ '/driverInfo?term='+term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}