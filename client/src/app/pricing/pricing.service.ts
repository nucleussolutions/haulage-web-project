import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Pricing} from './pricing';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class PricingService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Pricing[]> {
    let subject = new Subject<Pricing[]>();
    this.http.get(environment.serverUrl + '/pricing')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Pricing(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Pricing> {
    return this.http.get(environment.serverUrl + '/pricing/'+id)
      .map((r: Response) => new Pricing(r.json()));
  }

  save(pricing: Pricing): Observable<Pricing> {
    const requestOptions = new RequestOptions();
    if (pricing.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/pricing/' + pricing.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/pricing';
    }
    requestOptions.body = JSON.stringify(pricing);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Pricing(r.json()));
  }

  destroy(pricing: Pricing): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/pricing/' + pricing.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}