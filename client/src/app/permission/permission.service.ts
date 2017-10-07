import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Permission} from './permission';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PermissionService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Permission[]> {
    let subject = new Subject<Permission[]>();
    this.http.get(this.baseUrl + 'permission')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Permission(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Permission> {
    return this.http.get(this.baseUrl + 'permission/'+id)
      .map((r: Response) => new Permission(r.json()));
  }

  save(permission: Permission): Observable<Permission> {
    const requestOptions = new RequestOptions();
    if (permission.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'permission/' + permission.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'permission';
    }
    requestOptions.body = JSON.stringify(permission);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Permission(r.json()));
  }

  destroy(permission: Permission): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'permission/' + permission.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}