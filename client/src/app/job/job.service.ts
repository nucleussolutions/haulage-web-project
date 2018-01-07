import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Job} from './job';
import {Subject} from 'rxjs/Subject';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Consignment} from "../consignment/consignment";
import {PermissionService} from "../permission/permission.service";

@Injectable()
export class JobService {

  constructor(private http: HttpClient, private permissionService: PermissionService) {
  }

  list(userObject: any, offset: number): Observable<Job[]> {
    let subject = new Subject<Job[]>();


    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    this.permissionService.getByUserId(userObject.uid).flatMap(permission => {
      let urlPath;

      if(permission.authority == 'Super Admin'){
        urlPath = '/job';
      }else{
        urlPath = '/job/haulier/'+userObject.uid
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

  get(id: number, userObject: any): Observable<Job> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.get(environment.serverUrl + '/job/' + id, {
      headers: headers
    })
        .map((r: Response) => new Job(r.json()));
  }

  save(job: Job, userObject: any): Observable<Job> {
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
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.request(requestMethodStr, url, {
      headers: headers,
      body: body
    })
        .map((r: Response) => new Job(r.json()));
  }

  destroy(job: Job, userObject: any): Observable<boolean> {
    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    return this.http.delete(environment.serverUrl + '/job/' + job.id, {
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

    this.permissionService.getByUserId(userObject.uid).flatMap(permission => {
      let urlPath;

      if(permission.authority == 'Super Admin'){
        urlPath = '/job/count'
      }else{
        urlPath = '/job/countByHaulier/'+userObject.uid;
      }

      return this.http.get(environment.serverUrl + urlPath, {
        headers: headers
      });
    }).subscribe(json => {
      subject.next(json['count']);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  search(term: string, userObject: any): Observable<any[]> {
    let subject = new Subject<any[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    //todo need to search taking account of user permissions as well

    // this.permissionService.getByUserId(userObject.uid).flatMap(permission => {
    //
    //
    //
    //
    //
    // });

    this.http.get(environment.serverUrl + '/search/job?term=' + term, {
      headers: headers
    }).subscribe((json: any[]) => {
      subject.next(json);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  findAllByDriverId(driverId: string, userObject: any, offset: number){
    let subject = new Subject<Job[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/job/driver/'+driverId, {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }

  findAllByHaulierId(haulierId: string, userObject: any, offset: number){
    let subject = new Subject<Job[]>();

    let headers = new HttpHeaders({
      'token': userObject.token,
      'apiKey': userObject.apiKey,
      'userId': userObject.uid
    });

    let params = new HttpParams();
    params = params.append('offset', offset.toString());

    this.http.get(environment.serverUrl + '/job/haulier/'+haulierId, {
      headers: headers,
      params: params
    })
        .subscribe((json: any[]) => {
          subject.next(json);
        });
    return subject.asObservable();
  }
}