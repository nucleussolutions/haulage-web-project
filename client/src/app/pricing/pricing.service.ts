import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pricing} from './pricing';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from 'environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class PricingService {

  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey: string): Observable<Pricing[]> {
    let subject = new Subject<Pricing[]>();


    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/pricing', {
      headers: headers
    })
      .catch(err => {
        subject.error(err);
        return subject.asObservable();
      }).subscribe((json: any[]) => {
      subject.next(json.map((item: any) => new Pricing(item)))
    });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Pricing> {

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.get(environment.serverUrl + '/pricing/' + id, {
      headers: headers
    })
      .map((r: Response) => new Pricing(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  save(pricing: Pricing, token: string, apiKey: string): Observable<Pricing> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;

    if (pricing.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/pricing/' + pricing.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/pricing';
    }
    let body = JSON.stringify(pricing);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Pricing(r.json())).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  destroy(pricing: Pricing, token: string, apiKey: string): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/pricing/' + pricing.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}