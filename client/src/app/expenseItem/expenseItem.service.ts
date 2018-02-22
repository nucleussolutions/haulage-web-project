import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ExpenseItem} from './expenseItem';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ExpenseItemService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<ExpenseItem[]> {
    let subject = new Subject<ExpenseItem[]>();
    this.http.get(this.baseUrl + 'expenseItem')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new ExpenseItem(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<ExpenseItem> {
    return this.http.get(this.baseUrl + 'expenseItem/'+id)
      .map((r: Response) => new ExpenseItem(r.json()));
  }

  save(expenseItem: ExpenseItem): Observable<ExpenseItem> {
    const requestOptions = new RequestOptions();
    if (expenseItem.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'expenseItem/' + expenseItem.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'expenseItem';
    }
    requestOptions.body = JSON.stringify(expenseItem);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new ExpenseItem(r.json()));
  }

  destroy(expenseItem: ExpenseItem): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'expenseItem/' + expenseItem.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}