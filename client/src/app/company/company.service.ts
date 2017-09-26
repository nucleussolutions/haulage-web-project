import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Company} from './company';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class CompanyService {

  constructor(private http: Http) {
  }

  list(): Observable<Company[]> {
    let subject = new Subject<Company[]>();
    this.http.get(environment.serverUrl + '/company')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Company(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Company> {
    return this.http.get(environment.serverUrl + '/company/'+id)
      .map((r: Response) => new Company(r.json()));
  }

  save(company: Company): Observable<Company> {
    const requestOptions = new RequestOptions();
    if (company.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/company/' + company.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/company';
    }
    requestOptions.body = JSON.stringify(company);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Company(r.json()));
  }

  destroy(company: Company): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/company/' + company.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}