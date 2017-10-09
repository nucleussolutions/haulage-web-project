import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Consignment} from './consignment';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";

@Injectable()
export class ConsignmentService {

  // private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(token : string, apiKey : string): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();

      let headers = new Headers({
          'token': token,
          'apiKey': apiKey
      });

      let options = new RequestOptions({
          headers : headers
      });


    this.http.get(environment.serverUrl + '/consignment', options)
      .map((r: Response) => r.json())
        .catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Consignment(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token : string, apiKey : string): Observable<Consignment> {

      let headers = new Headers({
          'token': token,
          'apiKey': apiKey
      });

      let options = new RequestOptions({
          headers : headers
      });

      return this.http.get(environment.serverUrl + 'consignment/'+id, options)
      .map((r: Response) => new Consignment(r.json())).catch(err => {
              if (err.status === 401) {
                  return Observable.throw('Unauthorized');
              }else if(err.status === 500){
                  return Observable.throw('Internal server error');
              }
          });
  }

  save(consignment: Consignment, token : string, apiKey: string): Observable<Consignment> {
    const requestOptions = new RequestOptions();
    if (consignment.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/consignment/' + consignment.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/consignment';
    }
    requestOptions.body = JSON.stringify(consignment);
    requestOptions.headers = new Headers({
        "Content-Type": "application/json",
        'token': token,
        'apiKey': apiKey
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Consignment(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw('Unauthorized');
            }else if(err.status === 500){
                return Observable.throw('Internal server error');
            }
        });
  }

  destroy(consignment: Consignment, token : string, apiKey: string): Observable<boolean> {

      let headers = new Headers({
          'token': token,
          'apiKey': apiKey
      });

      let options = new RequestOptions({
          headers : headers
      });

    return this.http.delete(environment.serverUrl + '/consignment/' + consignment.id, options).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}