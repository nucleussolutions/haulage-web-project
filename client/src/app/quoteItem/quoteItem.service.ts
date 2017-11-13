import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {QuoteItem} from './quoteItem';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class QuoteItemService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<QuoteItem[]> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    let subject = new Subject<QuoteItem[]>();
    this.http.get(environment.serverUrl + '/quoteItem')
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new QuoteItem(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<QuoteItem> {
    //todo
    return this.http.get(environment.serverUrl + '/quoteItem/'+id)
      .map((r: Response) => new QuoteItem(r));
  }

  save(quoteItem: QuoteItem, userObject: any): Observable<QuoteItem> {

    let requestMethodStr;

    let url;

    if (quoteItem.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/quoteItem/' + quoteItem.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/quoteItem';
    }
    let body = JSON.stringify(quoteItem);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      body:body,
      headers: headers
    })
      .map((r: Response) => new QuoteItem(r));
  }

  destroy(quoteItem: QuoteItem): Observable<boolean> {
    //todo
    return this.http.delete(environment.serverUrl + '/quoteItem/' + quoteItem.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}