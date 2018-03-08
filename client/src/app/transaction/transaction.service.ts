import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Transaction} from './transaction';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Vehicle} from "../vehicle/vehicle";

@Injectable()
export class TransactionService {

  // private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<Transaction[]> {
    let subject = new Subject<any>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/transaction', {
      headers: headers,
      params: params
    })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Transaction> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    return this.http.get(environment.serverUrl + '/transaction/'+id, {
      headers: headers
    })
      .map((r: Response) => new Transaction(r));
  }

  save(transaction: Transaction, userObject: any): Observable<Transaction> {

    let url;
    let requestMethodStr;
    // const requestOptions = new RequestOptions();
    if (transaction.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr= 'PUT';
      url = environment.serverUrl + '/transaction/' + transaction.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/transaction';
    }
    let body = JSON.stringify(transaction);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Transaction(r));
  }

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });
    this.http.get(environment.serverUrl + '/transaction/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }


  destroy(transaction: Transaction, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    return this.http.delete(environment.serverUrl + '/transaction/' + transaction.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  search(term: string, userObject: any){
    let subject = new Subject<Vehicle[]>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/transaction?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

}