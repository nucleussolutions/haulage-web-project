import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NavDrawerService {

  public loginState = new Subject<boolean>();

  public appToNavDrawerLoginState = new Subject<boolean>();

  appToNavDrawerLoginState$ = this.appToNavDrawerLoginState.asObservable();

  constructor() { }

  trigger(loggedIn: boolean) {
    this.loginState.next(loggedIn);
  }

  triggerAppToNavDrawer(loggedIn : boolean){
    console.log('triggerAppToNavDrawer');
    this.appToNavDrawerLoginState.next(loggedIn);
    console.log('appToNavDrawerLoginState '+JSON.stringify(this.appToNavDrawerLoginState));
  }

  getLoginState(): Observable<any> {
    return this.loginState.asObservable();
  }

}
