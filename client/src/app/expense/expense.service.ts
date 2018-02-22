import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Expense} from './expense';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ExpenseService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Expense[]> {
    let subject = new Subject<Expense[]>();
    this.http.get(this.baseUrl + 'expense')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Expense(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Expense> {
    return this.http.get(this.baseUrl + 'expense/'+id)
      .map((r: Response) => new Expense(r.json()));
  }

  save(expense: Expense): Observable<Expense> {
    const requestOptions = new RequestOptions();
    if (expense.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'expense/' + expense.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'expense';
    }
    requestOptions.body = JSON.stringify(expense);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Expense(r.json()));
  }

  destroy(expense: Expense): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'expense/' + expense.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}