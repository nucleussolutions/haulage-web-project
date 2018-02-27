import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from "../environments/environment";
import {AngularFireAuth} from 'angularfire2/auth';
import {CookieService} from 'ngx-cookie';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/publish';
import {nextTick} from "q";

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth, private cookieService: CookieService) {
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(response => {
        let responseStr = JSON.stringify(response);

        response = JSON.parse(responseStr);

        this.cookieService.put('uid', response.uid);
        this.cookieService.put('email', email);
        this.cookieService.put('emailVerified', response.emailVerified);
        this.cookieService.put('displayName', response.displayName);
        this.cookieService.put('photoUrl', response.photoURL);
        this.cookieService.put('apiKey', response.apiKey);
        this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
        this.cookieService.put('token', response.stsTokenManager.accessToken);
        this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);
        this.firebaseAuth.auth.currentUser.sendEmailVerification().then(verificationResponse => {
          console.log('verification email sent');
        }, error => {
          console.log('faied to send verification email ' + error);
        });

        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
        let responseStr = JSON.stringify(response);
        response = JSON.parse(responseStr);
        this.cookieService.put('uid', response.uid);
        this.cookieService.put('email', email);
        this.cookieService.put('emailVerified', response.emailVerified);
        this.cookieService.put('displayName', response.displayName);
        this.cookieService.put('photoUrl', response.photoURL);
        this.cookieService.put('apiKey', response.apiKey);
        this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
        this.cookieService.put('token', response.stsTokenManager.accessToken);
        this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  logout() {
    // this.userObjectUpdatedSource.next(false);
    this.cookieService.removeAll();
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signOut().then(response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  getUser() {
    let subject = new Subject<any>();
    this.firebaseAuth.authState.subscribe(currentUser => {
      console.log('firebase current user '+JSON.stringify(currentUser));
      if(currentUser){
        let cookieObjects = this.cookieService.getAll();
        console.log('cookieObjects ' + JSON.stringify(cookieObjects));
        subject.next(cookieObjects);
      }else{
        subject.error('not logged in');
      }
    });
    return subject.asObservable();
  }

  sendPasswordResetEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.sendPasswordResetEmail(email).then(response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  confirmPasswordReset(code: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.confirmPasswordReset(code, password).then(response => {
        this.cookieService.removeAll();
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  verifyPasswordResetCode(code: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.verifyPasswordResetCode(code).then(response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  verifyEmailWithCode(oobCode: string){
    let subject = new Subject();
    this.firebaseAuth.auth.checkActionCode(oobCode).then(value => {
      subject.next(value);
    }, reason => {
      subject.error(reason);
    });
    return subject.asObservable();
  }

  // checkUserType(userId: string, token: string, apiKey: string) {
  //
  //   let headers = new HttpHeaders({
  //     'token': token,
  //     'apiKey': apiKey
  //   });
  //
  //   return new Promise((resolve, reject) => {
  //     this.http.get(environment.serverUrl + '/api/usertype?userId=' + userId, {
  //       headers: headers
  //     }).subscribe(response => {
  //       resolve(response);
  //     }, error => {
  //       reject(error);
  //     });
  //   });
  // }
}
