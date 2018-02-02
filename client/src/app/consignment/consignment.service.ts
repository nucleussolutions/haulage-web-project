import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Consignment} from './consignment';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PermissionService} from "../permission/permission.service";

@Injectable()
export class ConsignmentService {


  constructor(private http: HttpClient, private permissionService: PermissionService) {
  }

  list(userObject: any, offset: number): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.permissionService.getByUserId(userObject).flatMap(permission => {
      let urlPath;
      if (permission.authority == 'Super Admin') {
        urlPath = '/consignment';
      } else if (permission.authority == 'Admin') {
        urlPath = '/consignment/haulier/'+userObject.uid;
      } else if (permission.authority == 'Manager') {
        urlPath = '/consignment/forwarder/'+userObject.uid;
      }
      return this.http.get(environment.serverUrl + urlPath, {
        headers: headers,
        params: params
      });
    }).subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }

  listByStatus(userObject: any, status: string){
    let subject = new Subject<Consignment[]>();

    let params = new HttpParams();
    params = params.append('status', status);
    // params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.permissionService.getByUserId(userObject).flatMap(permission => {
      let urlPath;
      if (permission.authority == 'Super Admin') {
        urlPath = '/consignment';
      } else if (permission.authority == 'Admin') {
        urlPath = '/consignment/haulier/'+userObject.uid;
      } else if (permission.authority == 'Manager') {
        urlPath = '/consignment/forwarder/'+userObject.uid;
      }
      return this.http.get(environment.serverUrl + urlPath, {
        headers: headers,
        params: params
      });
    }).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number, userObject: any): Observable<Consignment> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/consignment/' + id, {
      headers: headers
    })
        .map((r: Response) => new Consignment(r));
  }

  getByRFTId(rftId: string, userObject: any): Observable<Consignment> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/consignment/transportRequest/' + rftId, {
      headers: headers
    }).map((r: Response) => new Consignment(r));
  }

  save(consignment: Consignment, userObject: any): Observable<Consignment> {
    let requestMethodStr;
    let url;

    if (consignment.id) {
      requestMethodStr = 'PUT';
      url = environment.serverUrl + '/consignment/' + consignment.id;
    } else {
      requestMethodStr = 'POST';
      url = environment.serverUrl + '/consignment';
    }
    let body = JSON.stringify(consignment);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
        .map((r: Response) => new Consignment(r.json())).catch(err => {
          if (err.status === 401) {
            return Observable.throw('Unauthorized');
          } else if (err.status === 500) {
            return Observable.throw('Internal server error');
          }
        });
  }

  destroy(consignment: Consignment, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.delete(environment.serverUrl + '/consignment/' + consignment.id, {
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


    this.http.get(environment.serverUrl + '/consignment/count', {
      headers: headers
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<Consignment[]> {
    let subject = new Subject<Consignment[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.http.get(environment.serverUrl + '/search/consignment?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

}