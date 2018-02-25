import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Expense} from './expense';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<Expense[]> {
    let subject = new Subject<Expense[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/expense', {
      params: params,
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  listWithoutPaging(userObject: any){
    let subject = new Subject<Expense[]>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/expense', {
      headers: headers
    })
        .subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Expense> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    return this.http.get(environment.serverUrl + '/expense/'+id, {
      headers: headers
    })
      .map((r: Response) => new Expense(r));
  }

  save(expense: Expense, userObject: any): Observable<Expense> {
    
    let requestMethodStr;
    let url;
    
    // const requestOptions = new RequestOptions();
    if (expense.id) {
      requestMethodStr = "PUT";
      url = environment.serverUrl + '/expense/' + expense.id;
    } else {
      requestMethodStr = "POST";
      url = environment.serverUrl + '/expense';
    }
    const body = JSON.stringify(expense);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Expense(r));
  }

  destroy(expense: Expense, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    return this.http.delete(environment.serverUrl + '/expense/' + expense.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }


}