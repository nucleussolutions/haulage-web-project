import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DriverInfo} from './driverInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";

@Injectable()
export class DriverInfoService {


  constructor(private http: Http) {
  }

  list(): Observable<DriverInfo[]> {
    let subject = new Subject<DriverInfo[]>();
    this.http.get(environment.serverUrl + '/driverInfo')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new DriverInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<DriverInfo> {
    return this.http.get(environment.serverUrl + '/driverInfo/'+id)
      .map((r: Response) => new DriverInfo(r.json()));
  }

  save(driverInfo: DriverInfo): Observable<DriverInfo> {
    const requestOptions = new RequestOptions();
    if (driverInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/driverInfo/' + driverInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/driverInfo';
    }
    requestOptions.body = JSON.stringify(driverInfo);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new DriverInfo(r.json()));
  }

  destroy(driverInfo: DriverInfo): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/driverInfo/' + driverInfo.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}