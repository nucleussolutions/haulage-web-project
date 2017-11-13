import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {QuoteItem} from './quoteItem';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class QuoteItemService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<QuoteItem[]> {
    let subject = new Subject<QuoteItem[]>();
    this.http.get(this.baseUrl + 'quoteItem')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new QuoteItem(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<QuoteItem> {
    return this.http.get(this.baseUrl + 'quoteItem/'+id)
      .map((r: Response) => new QuoteItem(r.json()));
  }

  save(quoteItem: QuoteItem): Observable<QuoteItem> {
    const requestOptions = new RequestOptions();
    if (quoteItem.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'quoteItem/' + quoteItem.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'quoteItem';
    }
    requestOptions.body = JSON.stringify(quoteItem);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new QuoteItem(r.json()));
  }

  destroy(quoteItem: QuoteItem): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'quoteItem/' + quoteItem.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}