import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Company} from './company';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Consignment} from "../consignment/consignment";

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  list(userObject, offset: number): Observable<Company[]> {
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/company', {
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

  listWithoutPaging(userObject: any): Observable<Company[]> {
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
    });

    this.http.get(environment.serverUrl + '/company', {
      headers: headers
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
          } else if (err.status === 500) {
            return Observable.throw(new Error('Internal server error'));
          }
        });
  }



  getByRegistrationNo(registrationNo: string, userObject: any): Observable<Company> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    console.log('registrationNo '+registrationNo);

    return this.http.get(environment.serverUrl + '/company/registrationNo/' + registrationNo, {
      headers: headers
    }).map((r: Response) => new Company(r)).catch(err => {
          if (err.status === 401) {
            return Observable.throw(new Error('Unauthorized'));
          } else if (err.status === 500) {
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
          } else if (err.status === 500) {
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

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });


    this.http.get(environment.serverUrl + '/company/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<Company[]> {
    console.log('search company');
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/company?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  searchByRegNo(term: string, userObject: any): Observable<Company[]> {
    console.log('search company');
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/company/registrationNo?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  searchHauliers(term: string, userObject: any): Observable<Company[]>{
    //list companies where permission = admin
    console.log('search company');
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/company/haulier?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  searchForwarders(term: string, userObject: any): Observable<Company[]>{
    console.log('search company');
    let subject = new Subject<Company[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/company/forwarder?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

}