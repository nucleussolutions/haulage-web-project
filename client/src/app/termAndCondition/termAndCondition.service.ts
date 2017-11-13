import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TermAndCondition} from './termAndCondition';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class TermAndConditionService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<TermAndCondition[]> {
    let subject = new Subject<TermAndCondition[]>();
    this.http.get(this.baseUrl + 'termAndCondition')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new TermAndCondition(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<TermAndCondition> {
    return this.http.get(this.baseUrl + 'termAndCondition/'+id)
      .map((r: Response) => new TermAndCondition(r.json()));
  }

  save(termAndCondition: TermAndCondition): Observable<TermAndCondition> {
    const requestOptions = new RequestOptions();
    if (termAndCondition.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'termAndCondition/' + termAndCondition.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'termAndCondition';
    }
    requestOptions.body = JSON.stringify(termAndCondition);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new TermAndCondition(r.json()));
  }

  destroy(termAndCondition: TermAndCondition): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'termAndCondition/' + termAndCondition.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}