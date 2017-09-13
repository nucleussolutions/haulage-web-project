import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from './customer';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Customer[]> {
    let subject = new Subject<Customer[]>();
    this.http.get(this.baseUrl + 'customer')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Customer(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Customer> {
    return this.http.get(this.baseUrl + 'customer/'+id)
      .map((r: Response) => new Customer(r.json()));
  }

  save(customer: Customer): Observable<Customer> {
    const requestOptions = new RequestOptions();
    if (customer.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'customer/' + customer.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'customer';
    }
    requestOptions.body = JSON.stringify(customer);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Customer(r.json()));
  }

  destroy(customer: Customer): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'customer/' + customer.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}