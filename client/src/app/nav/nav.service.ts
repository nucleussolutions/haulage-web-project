import {Injectable} from '@angular/core';

import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class NavService {

  _navData: Observable<any>;

  constructor(private http: HttpClient) { }

  getNavData(): Observable<any> {
    if (!this._navData) {
      this._navData = this.http.get(environment.serverUrl + 'application')
          .map((res: Response) => res.json())
          .publishReplay()
          .refCount();
    }
    return this._navData;
  }
}
