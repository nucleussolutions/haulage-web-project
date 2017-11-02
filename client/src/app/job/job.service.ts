import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Job} from './job';
import {Subject} from 'rxjs/Subject';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class JobService {

  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey: string): Observable<Job[]> {
    let subject = new Subject<Job[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/job', {
      headers: headers
    })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Job(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Job> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.get(environment.serverUrl + '/job/' + id, {
      headers: headers
    })
      .map((r: Response) => new Job(r.json()));
  }

  save(job: Job, token: string, apiKey: string): Observable<Job> {
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
      'token': token,
      'apiKey': apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Job(r.json()));
  }

  destroy(job: Job, token: string, apiKey: string): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/job/' + job.id, {
      headers:headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}