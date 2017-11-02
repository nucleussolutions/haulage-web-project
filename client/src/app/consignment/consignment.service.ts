import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Consignment} from './consignment';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ConsignmentService {


  constructor(private http: HttpClient) {
  }

  list(token, apiKey): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/consignment', {
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Consignment(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Consignment> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });


    return this.http.get(environment.serverUrl + '/consignment/' + id,)
      .map((r: Response) => new Consignment(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        } else if (err.status === 500) {
          return Observable.throw('Internal server error');
        }
      });
  }

  save(consignment: Consignment, token: string, apiKey: string): Observable<Consignment> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;

    if (consignment.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/consignment/' + consignment.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/consignment';
    }
    let body = JSON.stringify(consignment);
    let headers = new HttpHeaders({
      "Content-Type": "application/json", 'token': token,
      'apiKey': apiKey
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

  destroy(consignment: Consignment, token: string, apiKey: string): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/consignment/' + consignment.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}