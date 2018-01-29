import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from './vehicle';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {PermissionService} from "../permission/permission.service";

@Injectable()
export class VehicleService {


  constructor(private http: HttpClient, private permissionService: PermissionService) {
  }

  list(userObject: any, offset: number): Observable<Vehicle[]> {
    let subject = new Subject<Vehicle[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.permissionService.getByUserId(userObject).flatMap(permission => {
      let urlPath;

      if(permission.authority == 'Super Admin'){
        urlPath = '/vehicle';
      }else if(permission.authority == 'Admin'){
        urlPath = '/vehicle/haulier';
      }

      return this.http.get(environment.serverUrl + urlPath, {
        headers: headers,
        params: params
      });
    }).catch(err => {
        subject.error(err);
        return subject.asObservable();
      })
      .subscribe((json: any[]) => {
        subject.next(json);
      });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Vehicle> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });
    return this.http.get(environment.serverUrl + '/vehicle/' + id, {
      headers: headers
    })
      .map((r: Response) => new Vehicle(r)).catch(err => {
        if (err.status === 401) {
          return Observable.throw(new Error('Unauthorized'));
        } else if (err.status === 500) {
          return Observable.throw(new Error('Internal server error'));
        }
      });
  }

  save(vehicle: Vehicle, userObject: any): Observable<Vehicle> {
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
      "Content-Type": "appzlication/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
      .map(r => new Vehicle(r));
  }

  destroy(vehicle: Vehicle, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    return this.http.delete(environment.serverUrl + '/vehicle/' + vehicle.id, {
      headers: headers
    }).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }

  count(userObject: any): Observable<number> {
    let subject = new Subject<number>();
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });
    this.http.get(environment.serverUrl + '/vehicle/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<Vehicle[]> {
    let subject = new Subject<Vehicle[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid

    });

    this.http.get(environment.serverUrl + '/search/vehicle?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}