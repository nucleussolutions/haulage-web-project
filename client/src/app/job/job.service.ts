import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Job} from './job';
import {Subject} from 'rxjs/Subject';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class JobService {

    constructor(private http: Http) {
    }

    list(token: string, apiKey: string): Observable<Job[]> {
        let subject = new Subject<Job[]>();

        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });

        this.http.get(environment.serverUrl + '/job', options)
            .map((r: Response) => r.json())
            .subscribe((json: any[]) => {
                subject.next(json.map((item: any) => new Job(item)))
            });
        return subject.asObservable();
    }

    get(id: number, token: string, apiKey: string): Observable<Job> {
        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });
        return this.http.get(environment.serverUrl + '/job/' + id, options)
            .map((r: Response) => new Job(r.json()));
    }

    save(job: Job, token: string, apiKey: string): Observable<Job> {
        const requestOptions = new RequestOptions();
        if (job.id) {
            requestOptions.method = RequestMethod.Put;
            requestOptions.url = environment.serverUrl + '/job/' + job.id;
        } else {
            requestOptions.method = RequestMethod.Post;
            requestOptions.url = environment.serverUrl + '/job';
        }
        requestOptions.body = JSON.stringify(job);
        requestOptions.headers = new Headers({
            "Content-Type": "application/json",
            'token': token,
            'apiKey': apiKey
        });

        return this.http.request(new Request(requestOptions))
            .map((r: Response) => new Job(r.json()));
    }

    destroy(job: Job, token: string, apiKey: string): Observable<boolean> {
        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });
        return this.http.delete(environment.serverUrl + '/job/' + job.id, options).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}