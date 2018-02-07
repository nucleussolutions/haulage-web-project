import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserInfo} from './userInfo';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserInfoService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<UserInfo[]> {
    let subject = new Subject<UserInfo[]>();
    this.http.get(this.baseUrl + 'userInfo')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new UserInfo(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<UserInfo> {
    return this.http.get(this.baseUrl + 'userInfo/'+id)
      .map((r: Response) => new UserInfo(r.json()));
  }

  save(userInfo: UserInfo): Observable<UserInfo> {
    const requestOptions = new RequestOptions();
    if (userInfo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'userInfo/' + userInfo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'userInfo';
    }
    requestOptions.body = JSON.stringify(userInfo);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new UserInfo(r.json()));
  }

  destroy(userInfo: UserInfo): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'userInfo/' + userInfo.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}