import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Vehicle} from './vehicle';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class VehicleService {


  constructor(private http: HttpClient) {
  }

  list(token: string, apiKey : string): Observable<Vehicle[]> {
    let subject = new Subject<Vehicle[]>();

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    this.http.get(environment.serverUrl + '/vehicle', {
      headers: headers
    })
      .map((r: Response) => r.json())
        .catch(err => {
            subject.error(err);
            return subject.asObservable();
        })
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Vehicle(item)))
      });
    return subject.asObservable();
  }

  get(id: number, token: string, apiKey: string): Observable<Vehicle> {
    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });
    return this.http.get(environment.serverUrl + '/vehicle/'+id, {
      headers: headers
    })
      .map((r: Response) => new Vehicle(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw(new Error('Unauthorized'));
            }else if(err.status === 500){
                return Observable.throw(new Error('Internal server error'));
            }
        });
  }

  save(vehicle: Vehicle, token: string, apiKey: string): Observable<Vehicle> {
    // const requestOptions = new RequestOptions();

    let requestMethodStr;
    let url;

    if (vehicle.id) {
      // requestOptions.method = RequestMethod.Put;
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/vehicle/' + vehicle.id;
    } else {
      // requestOptions.method = RequestMethod.Post;
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/vehicle';
    }
    let body = JSON.stringify(vehicle);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token' : token,
      'apiKey': apiKey
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map((r: Response) => new Vehicle(r.json())).catch(err => {
            if (err.status === 401) {
                return Observable.throw(new Error('Unauthorized'));
            }else if(err.status === 500){
                return Observable.throw(new Error('Internal server error'));
            }
        });
  }

  destroy(vehicle: Vehicle, token : string, apiKey : string): Observable<boolean> {

    let headers = new HttpHeaders({
      'token': token,
      'apiKey': apiKey
    });

    return this.http.delete(environment.serverUrl + '/vehicle/' + vehicle.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}