import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from './subscription';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class SubscriptionService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<Subscription[]> {
    let subject = new Subject<Subscription[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/subscription', {
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Subscription(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Subscription> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/subscription/' + id, {
      headers: headers
    })
      .map((r: Response) => new Subscription(r));
  }

  save(subscription: Subscription, userObject: any): Observable<Subscription> {
    let requestMethodStr;

    let url;

    if (subscription.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/subscription/' + subscription.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/subscription';
    }
    let body = JSON.stringify(subscription);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      body: body,
      headers: headers
    })
      .map((r: Response) => new Subscription(r));
  }

  destroy(subscription: Subscription, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    return this.http.delete(environment.serverUrl + '/subscription/' + subscription.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}