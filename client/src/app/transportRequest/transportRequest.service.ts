import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TransportRequest} from './transportRequest';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Quote} from "../quote/quote";

@Injectable()
export class TransportRequestService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, offset: number): Observable<TransportRequest[]> {
    let subject = new Subject<TransportRequest[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/transportRequest', {
      headers: headers,
      params: params
    })
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<TransportRequest> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/transportRequest/' + id, {
      headers: headers
    })
      .map((r: Response) => new TransportRequest(r));
  }

  save(transportRequest: TransportRequest, userObject: any): Observable<TransportRequest> {

    let requestMethodStr;

    let url;

    if (transportRequest.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/transportRequest/' + transportRequest.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/transportRequest';
    }
    let body = JSON.stringify(transportRequest);
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
      .map((r: Response) => new TransportRequest(r));
  }

  destroy(transportRequest: TransportRequest, userObject: any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    return this.http.delete(environment.serverUrl + '/transportRequest/' + transportRequest.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any) : Observable<number>{
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });
    this.http.get(environment.serverUrl+ '/transportRequest/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<TransportRequest[]>{
    let subject = new Subject<TransportRequest[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    this.http.get(environment.serverUrl+ '/transportRequest?term='+term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json.map((item: any) => new TransportRequest(item)));
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}