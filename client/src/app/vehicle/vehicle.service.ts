import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Vehicle} from './vehicle';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";

@Injectable()
export class VehicleService {


  constructor(private http: Http) {
  }

  list(): Observable<Vehicle[]> {
    let subject = new Subject<Vehicle[]>();
    this.http.get(environment.serverUrl + '/vehicle')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Vehicle(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Vehicle> {
    return this.http.get(environment.serverUrl + '/vehicle/'+id)
      .map((r: Response) => new Vehicle(r.json()));
  }

  save(vehicle: Vehicle): Observable<Vehicle> {
    const requestOptions = new RequestOptions();
    if (vehicle.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = environment.serverUrl + '/vehicle/' + vehicle.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = environment.serverUrl + '/vehicle';
    }
    requestOptions.body = JSON.stringify(vehicle);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Vehicle(r.json()));
  }

  destroy(vehicle: Vehicle): Observable<boolean> {
    return this.http.delete(environment.serverUrl + '/vehicle/' + vehicle.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}