import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Job} from './job';
import {Subject} from 'rxjs/Subject';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Consignment} from "../consignment/consignment";

@Injectable()
export class JobService {

  constructor(private http: HttpClient) {
  }

  list(userObject:any, offset: number): Observable<Job[]> {
    let subject = new Subject<Job[]>();


    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl + '/job', {
      headers: headers,
      params: params
    })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject:any): Observable<Job> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.get(environment.serverUrl + '/job/' + id, {
      headers: headers
    })
      .map((r: Response) => new Job(r.json()));
  }

  save(job: Job, userObject:any): Observable<Job> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;

    if (job.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/job/' + job.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/job';
    }
    let body = JSON.stringify(job);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Job(r.json()));
  }

  destroy(job: Job, userObject:any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    return this.http.delete(environment.serverUrl + '/job/' + job.id, {
      headers:headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any) : Observable<number>{
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });
    this.http.get(environment.serverUrl+ '/job/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<any[]>{
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey
    });

    this.http.get(environment.serverUrl+ '/search/job?term='+term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}