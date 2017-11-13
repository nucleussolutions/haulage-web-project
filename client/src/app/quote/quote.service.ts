import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Quote} from './quote';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<Quote[]> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    let subject = new Subject<Quote[]>();
    this.http.get(environment.serverUrl + 'quote', {
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Quote(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Quote> {



    return this.http.get(environment.serverUrl + 'quote/' + id)
      .map((r: Response) => new Quote(r.json()));
  }

  save(quote: Quote, userObject: any): Observable<Quote> {
    let requestMethodStr;

    let url;

    if (quote.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + 'quote/' + quote.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + 'quote';
    }
    let body = JSON.stringify(quote);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
    });

    return this.http.request(requestMethodStr, url, {
      body: body,
      headers: headers
    })
      .map((r: Response) => new Quote(r));
  }

  destroy(quote: Quote, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    return this.http.delete(environment.serverUrl + 'quote/' + quote.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}