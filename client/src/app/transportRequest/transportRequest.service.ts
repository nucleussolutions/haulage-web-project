import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TransportRequest} from './transportRequest';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";

@Injectable()
export class TransportRequestService {

  constructor(private http: Http) {
  }

  list(token : string): Observable<TransportRequest[]> {
    let subject = new Subject<TransportRequest[]>();

    let headers = new Headers({
      'token': token
    });

    let options = new RequestOptions({
      headers : headers
    });

    this.http.get(environment.serverUrl + '/transportRequest', options)
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new TransportRequest(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<TransportRequest> {
    return this.http.get(environment.serverUrl + '/transportRequest/'+id)
      .map((r: Response) => new TransportRequest(r.json()));
  }

  save(transportRequest: TransportRequest): Observable<TransportRequest> {
    const requestOptions = new RequestOptions();
    if (transportRequest.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/transportRequest/' + transportRequest.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/transportRequest';
    }
    requestOptions.body = JSON.stringify(transportRequest);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new TransportRequest(r.json()));
  }

  destroy(transportRequest: TransportRequest): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/transportRequest/' + transportRequest.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}