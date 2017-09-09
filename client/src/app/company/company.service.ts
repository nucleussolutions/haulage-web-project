import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Company} from './company';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class CompanyService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Company[]> {
    let subject = new Subject<Company[]>();
    this.http.get(this.baseUrl + 'company')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Company(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Company> {
    return this.http.get(this.baseUrl + 'company/'+id)
      .map((r: Response) => new Company(r.json()));
  }

  save(company: Company): Observable<Company> {
    const requestOptions = new RequestOptions();
    if (company.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'company/' + company.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'company';
    }
    requestOptions.body = JSON.stringify(company);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Company(r.json()));
  }

  destroy(company: Company): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'company/' + company.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}