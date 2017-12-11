import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Company } from './company';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  list(userObject, page: number): Observable<Company[]> {
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
    });

    let offset = page * 10;

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('max', '10');

    this.http.get(environment.serverUrl + '/company', {
      headers: headers,
      params: params
    })
        .catch(err => {
            subject.error(err);
            return subject.asObservable();
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Company(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Company> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/company/' + id, {
      headers: headers
    })
      .map((r: Response) => new Company(r)).catch(err => {
            if (err.status === 401) {
                return Observable.throw(new Error('Unauthorized'));
            }else if(err.status === 500){
                return Observable.throw(new Error('Internal server error'));
            }
        });
  }

  save(company: Company, userObject: any): Observable<Company> {

    let requestMethodStr;
    let url;

    if (company.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/company/' + company.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/company';
    }
     let body = JSON.stringify(company);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Company(r)).catch(err => {
            if (err.status === 401) {
                return Observable.throw(new Error('Unauthorized'));
            }else if(err.status === 500){
                return Observable.throw(new Error('Internal server error'));
            }
        });
  }

  destroy(company: Company, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/company/' + company.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}