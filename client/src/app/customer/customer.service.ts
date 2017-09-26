import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from './customer';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class CustomerService {

  constructor(private http: Http) {
  }

  list(): Observable<Customer[]> {
    let subject = new Subject<Customer[]>();
    this.http.get(environment.serverUrl + '/customer')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Customer(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Customer> {
    return this.http.get(environment.serverUrl + '/customer/'+id)
      .map((r: Response) => new Customer(r.json()));
  }

  save(customer: Customer): Observable<Customer> {
    const requestOptions = new RequestOptions();
    if (customer.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/customer/' + customer.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/customer';
    }
    requestOptions.body = JSON.stringify(customer);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Customer(r.json()));
  }

  destroy(customer: Customer): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/customer/' + customer.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}