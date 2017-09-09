import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Vehicle} from './vehicle';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class VehicleService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Vehicle[]> {
    let subject = new Subject<Vehicle[]>();
    this.http.get(this.baseUrl + 'vehicle')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Vehicle(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Vehicle> {
    return this.http.get(this.baseUrl + 'vehicle/'+id)
      .map((r: Response) => new Vehicle(r.json()));
  }

  save(vehicle: Vehicle): Observable<Vehicle> {
    const requestOptions = new RequestOptions();
    if (vehicle.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'vehicle/' + vehicle.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'vehicle';
    }
    requestOptions.body = JSON.stringify(vehicle);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Vehicle(r.json()));
  }

  destroy(vehicle: Vehicle): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'vehicle/' + vehicle.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}