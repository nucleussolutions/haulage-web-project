import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Tariff} from './tariff';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class TariffService {

  constructor(private http: HttpClient) {
  }

  list(userObject: any, page: number): Observable<Tariff[]> {
    let subject = new Subject<Tariff[]>();
    let offset = page * 10;

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    params = params.append('max', '10');
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/tariff', {
      headers: headers,
      params: params
    })
        .catch(err => {
          subject.error(err);
          return subject.asObservable();
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Tariff(item)))
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Tariff> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/tariff/' + id, {
      headers: headers
    })
      .map((r: Response) => new Tariff(r));
  }

  save(tariff: Tariff, userObject: any): Observable<Tariff> {
    let requestMethodStr;

    let url;

    if (tariff.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/tariff/' + tariff.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/tariff';
    }
    let body = JSON.stringify(tariff);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Tariff(r));
  }

  destroy(tariff: Tariff, userObject : any): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/tariff/' + tariff.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}