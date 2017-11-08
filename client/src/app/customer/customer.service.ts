import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Customer} from './customer';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<Customer[]> {
    let subject = new Subject<Customer[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });


    this.http.get(environment.serverUrl + '/customer', {
      headers: headers
    })
      .catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        } else if (err.status === 500) {
          return Observable.throw('Internal server error');
        }
      })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Customer(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Customer> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });


    return this.http.get(environment.serverUrl + '/customer/' + id, {
      headers: headers
    })
      .map((r: Response) => new Customer(r)).catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        } else if (err.status === 500) {
          return Observable.throw('Internal server error');
        }
      });
  }

  save(customer: Customer, userObject: any): Observable<Customer> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;


    if (customer.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/customer/' + customer.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/customer';
    }
    let body = JSON.stringify(customer);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      body: body,
      headers: headers
    })
      .map((r: Response) => new Customer(r)).catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        } else if (err.status === 500) {
          return Observable.throw('Internal server error');
        }
      });
  }

  destroy(customer: Customer, userObject: any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/customer/' + customer.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}