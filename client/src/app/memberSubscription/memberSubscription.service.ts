import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MemberSubscription} from './memberSubscription';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class MemberSubscriptionService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, page: number): Observable<MemberSubscription[]> {
    let subject = new Subject<MemberSubscription[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/memberSubscription', {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<MemberSubscription> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });


    return this.http.get(environment.serverUrl + '/memberSubscription/'+id, {
      headers: headers
    })
      .map((r: Response) => new MemberSubscription(r));
  }

  save(memberSubscription: MemberSubscription, userObject: any): Observable<MemberSubscription> {
    let requestMethodStr;
    let url;

    if (memberSubscription.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/memberSubscription/' + memberSubscription.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/memberSubscription';
    }
    let body = JSON.stringify(memberSubscription);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new MemberSubscription(r));
  }

  destroy(memberSubscription: MemberSubscription, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    return this.http.delete(environment.serverUrl + '/memberSubscription/' + memberSubscription.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number>{
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    this.http.get(environment.serverUrl+ '/memberSubscription/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}