import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MemberSubscription} from './memberSubscription';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class MemberSubscriptionService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<MemberSubscription[]> {
    let subject = new Subject<MemberSubscription[]>();
    this.http.get(environment.serverUrl + '/memberSubscription')
        .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new MemberSubscription(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<MemberSubscription> {
    return this.http.get(environment.serverUrl + '/memberSubscription/'+id)
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
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new MemberSubscription(r));
  }

  destroy(memberSubscription: MemberSubscription): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/memberSubscription/' + memberSubscription.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}