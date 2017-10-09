import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from './company';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class CompanyService {

  constructor(private http: Http) {
  }

  list(token: string, apiKey: string): Observable<Company[]> {
    let subject = new Subject<Company[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey,
    });

    let options = new RequestOptions({
      headers: headers
    });


    this.http.get(environment.serverUrl + '/company', options)
      .map((r: Response) => r.json())
        .catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Company(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Company> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.get(environment.serverUrl + '/company/' + id, options)
      .map((r: Response) => new Company(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  save(company: Company, token: string, apiKey: string): Observable<Company> {
    const requestOptions = new RequestOptions();
    if (company.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/company/' + company.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/company';
    }
    requestOptions.body = JSON.stringify(company);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Company(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  destroy(company: Company, token: string, apiKey: string): Observable<boolean> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.delete(environment.serverUrl + '/company/' + company.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}