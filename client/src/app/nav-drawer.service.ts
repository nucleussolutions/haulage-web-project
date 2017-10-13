import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NavDrawerService {

  public loginState = new Subject<boolean>();

  constructor() { }

  trigger(loggedIn: boolean) {
    this.loginState.next(loggedIn);
  }

  getLoginState(): Observable<any> {
    return this.loginState.asObservable();
  }
}
