import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Quote} from './quote';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class QuoteService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Quote[]> {
    let subject = new Subject<Quote[]>();
    this.http.get(this.baseUrl + 'quote')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Quote(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Quote> {
    return this.http.get(this.baseUrl + 'quote/'+id)
      .map((r: Response) => new Quote(r.json()));
  }

  save(quote: Quote): Observable<Quote> {
    const requestOptions = new RequestOptions();
    if (quote.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'quote/' + quote.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'quote';
    }
    requestOptions.body = JSON.stringify(quote);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Quote(r.json()));
  }

  destroy(quote: Quote): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'quote/' + quote.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}