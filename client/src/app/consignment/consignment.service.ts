import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Consignment} from './consignment';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ConsignmentService {


  constructor(private http: HttpClient) {
  }

  list(userObject: any, page: number): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();

    let offset = page * 10;

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('max', '10');

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/consignment', {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
          subject.next(json.map((item: any) => new Consignment(item)))
        });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Consignment> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/consignment/' + id, {
      headers: headers
    })
        .map((r: Response) => new Consignment(r));
  }

  getByRFTId(rftId: string, userObject: any): Observable<Consignment> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/consignment?rftId=' + rftId, {
      headers: headers
    }).map((r: Response) => new Consignment(r));
  }

  save(consignment: Consignment, userObject: any): Observable<Consignment> {
    let requestMethodStr;
    let url;

    if (consignment.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/consignment/' + consignment.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/consignment';
    }
    let body = JSON.stringify(consignment);
    let headers = new HttpHeaders({
      "Content-Type": "application/json", 'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
        .map((r: Response) => new Consignment(r.json())).catch(err => {
          if (err.status === 401) {
            return Observable.throw('Unauthorized');
          } else if (err.status === 500) {
            return Observable.throw('Internal server error');
          }
        });
  }

  destroy(consignment: Consignment, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/consignment/' + consignment.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}