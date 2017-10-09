import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Pricing} from './pricing';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from 'environments/environment';

@Injectable()
export class PricingService {

    constructor(private http: Http) {
    }

    list(token: string, apiKey: string): Observable<Pricing[]> {
        let subject = new Subject<Pricing[]>();


        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });

        this.http.get(environment.serverUrl + '/pricing')
            .map((r: Response) => r.json())
            .catch(err => {
                if (err.status === 401) {
                    return Observable.throw('Unauthorized');
                }else if(err.status === 500){
                    return Observable.throw('Internal server error');
                }
            }).subscribe((json: any[]) => {
                subject.next(json.map((item: any) => new Pricing(item)))
            });
        return subject.asObservable();
    }

    get(id: number, token: string, apiKey: string): Observable<Pricing> {

        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this.http.get(environment.serverUrl + '/pricing/' + id, options)
            .map((r: Response) => new Pricing(r.json())).catch(err => {
                if (err.status === 401) {
                    return Observable.throw('Unauthorized');
                }else if(err.status === 500){
                    return Observable.throw('Internal server error');
                }
            });
    }

    save(pricing: Pricing, token: string, apiKey: string): Observable<Pricing> {
        const requestOptions = new RequestOptions();
        if (pricing.id) {
            requestOptions.method = RequestMethod.Put;
            requestOptions.url = environment.serverUrl + '/pricing/' + pricing.id;
        } else {
            requestOptions.method = RequestMethod.Post;
            requestOptions.url = environment.serverUrl + '/pricing';
        }
        requestOptions.body = JSON.stringify(pricing);
        requestOptions.headers = new Headers({
            "Content-Type": "application/json",
            'token': token,
            'apiKey': apiKey
        });

        return this.http.request(new Request(requestOptions))
            .map((r: Response) => new Pricing(r.json())).catch(err => {
                if (err.status === 401) {
                    return Observable.throw('Unauthorized');
                }else if(err.status === 500){
                    return Observable.throw('Internal server error');
                }
            });
    }

    destroy(pricing: Pricing, token : string, apiKey : string): Observable<boolean> {

        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers : headers
        });

        return this.http.delete(environment.serverUrl + '/pricing/' + pricing.id, options).map((res: Response) => res.ok).catch(() => {
            return Observable.of(false);
        });
    }
}