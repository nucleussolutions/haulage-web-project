import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TransportRequest} from './transportRequest';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";

@Injectable()
export class TransportRequestService {

  constructor(private http: Http) {
  }

  list(token : string, apiKey : string): Observable<TransportRequest[]> {
    let subject = new Subject<TransportRequest[]>();

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    this.http.get(environment.serverUrl + '/transportRequest', options)
      .map((r: Response) => r.json())
        .catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new TransportRequest(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey : string): Observable<TransportRequest> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    return this.http.get(environment.serverUrl + '/transportRequest/'+id, options)
      .map((r: Response) => new TransportRequest(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  save(transportRequest: TransportRequest, token: string, apiKey : string): Observable<TransportRequest> {
    const requestOptions = new RequestOptions();
    if (transportRequest.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/transportRequest/' + transportRequest.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/transportRequest';
    }
    requestOptions.body = JSON.stringify(transportRequest);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new TransportRequest(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  destroy(transportRequest: TransportRequest, token: string, apiKey : string): Observable<boolean> {

    let headers = new Headers({
      'token': token,
      'apiKey': apiKey
    });

    let options = new RequestOptions({
      headers : headers
    });

    return this.http.delete(environment.serverUrl + '/transportRequest/' + transportRequest.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}