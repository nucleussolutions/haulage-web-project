import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TermAndCondition} from './termAndCondition';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class TermAndConditionService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any): Observable<TermAndCondition[]> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    let subject = new Subject<TermAndCondition[]>();
    this.http.get(environment.serverUrl + '/termAndCondition', {
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new TermAndCondition(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<TermAndCondition> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    return this.http.get(environment.serverUrl + '/termAndCondition/'+id, {
      headers: headers
    })
      .map((r: Response) => new TermAndCondition(r));
  }

  save(termAndCondition: TermAndCondition, userObject: any): Observable<TermAndCondition> {

    let requestMethodStr;
    let url;

    if (termAndCondition.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/termAndCondition/' + termAndCondition.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/termAndCondition';
    }
    let body = JSON.stringify(termAndCondition);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      body: body,
      headers: headers
    })
      .map((r: Response) => new TermAndCondition(r));
  }

  destroy(termAndCondition: TermAndCondition, userObject: any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/termAndCondition/' + termAndCondition.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}