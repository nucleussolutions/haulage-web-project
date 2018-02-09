import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Quote } from './quote';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MemberSubscription } from "../memberSubscription/memberSubscription";
import { PermissionService } from 'app/permission/permission.service';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient, private permissionService: PermissionService) {
  }

  list(userObject: any, offset: number): Observable<Quote[]> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let subject = new Subject<Quote[]>();

    this.http.get(environment.serverUrl + '/quote', {
      headers: headers,
      params: params
    }).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Quote> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/quote/' + id, {
      headers: headers
    })
      .map((r: Response) => new Quote(r));
  }

  save(quote: Quote, userObject: any): Observable<Quote> {
    let requestMethodStr;

    let url;

    if (quote.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/quote/' + quote.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/quote';
    }
    let body = JSON.stringify(quote);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
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
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    return this.http.delete(environment.serverUrl + '/quote/' + quote.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });
    this.http.get(environment.serverUrl + '/quote/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<Quote[]> {
    let subject = new Subject<Quote[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/quote?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}
