import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Consignment} from './consignment';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ConsignmentService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();
    this.http.get(this.baseUrl + 'consignment')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Consignment(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Consignment> {
    return this.http.get(this.baseUrl + 'consignment/'+id)
      .map((r: Response) => new Consignment(r.json()));
  }

  save(consignment: Consignment): Observable<Consignment> {
    const requestOptions = new RequestOptions();
    if (consignment.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'consignment/' + consignment.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'consignment';
    }
    requestOptions.body = JSON.stringify(consignment);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Consignment(r.json()));
  }

  destroy(consignment: Consignment): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'consignment/' + consignment.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}