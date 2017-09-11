import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HaulierInfo} from './haulierInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class HaulierInfoService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<HaulierInfo[]> {
    let subject = new Subject<HaulierInfo[]>();
    this.http.get(this.baseUrl + 'haulierInfo')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new HaulierInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<HaulierInfo> {
    return this.http.get(this.baseUrl + 'haulierInfo/'+id)
      .map((r: Response) => new HaulierInfo(r.json()));
  }

  save(haulierInfo: HaulierInfo): Observable<HaulierInfo> {
    const requestOptions = new RequestOptions();
    if (haulierInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'haulierInfo/' + haulierInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'haulierInfo';
    }
    requestOptions.body = JSON.stringify(haulierInfo);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new HaulierInfo(r.json()));
  }

  destroy(haulierInfo: HaulierInfo): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'haulierInfo/' + haulierInfo.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}