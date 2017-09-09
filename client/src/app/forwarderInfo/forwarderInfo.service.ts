import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ForwarderInfo} from './forwarderInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ForwarderInfoService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<ForwarderInfo[]> {
    let subject = new Subject<ForwarderInfo[]>();
    this.http.get(this.baseUrl + 'forwarderInfo')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new ForwarderInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<ForwarderInfo> {
    return this.http.get(this.baseUrl + 'forwarderInfo/'+id)
      .map((r: Response) => new ForwarderInfo(r.json()));
  }

  save(forwarderInfo: ForwarderInfo): Observable<ForwarderInfo> {
    const requestOptions = new RequestOptions();
    if (forwarderInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'forwarderInfo/' + forwarderInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'forwarderInfo';
    }
    requestOptions.body = JSON.stringify(forwarderInfo);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new ForwarderInfo(r.json()));
  }

  destroy(forwarderInfo: ForwarderInfo): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'forwarderInfo/' + forwarderInfo.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}