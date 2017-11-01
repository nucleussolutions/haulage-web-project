import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { environment } from "../environments/environment";
import { AngularFireAuth } from 'angularfire2/auth';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class UserService {

    private loginState = new Subject<boolean>();

    loginState$ = this.loginState.asObservable();

    constructor(private http: Http, private firebaseAuth: AngularFireAuth, private cookieService: CookieService) {
    }

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(response => {
                let responseStr = JSON.stringify(response);

                response = JSON.parse(responseStr);

                this.cookieService.put('uid', response.uid);
                this.cookieService.put('emailVerified', response.emailVerified);
                this.cookieService.put('displayName', response.displayName);
                this.cookieService.put('photoUrl', response.photoURL);
                this.cookieService.put('apiKey', response.apiKey);
                this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
                this.cookieService.put('token', response.stsTokenManager.accessToken);
                this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);
                this.loginState.next(true);
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
                this.cookieService.put('emailVerified', response.emailVerified);
                this.cookieService.put('displayName', response.displayName);
                this.cookieService.put('photoUrl', response.photoURL);
                this.cookieService.put('apiKey', response.apiKey);
                this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
                this.cookieService.put('token', response.stsTokenManager.accessToken);
                this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);
                this.loginState.next(true);
                //todo store information in cookie so that it can be accessed by the ui
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    logout() {
        this.loginState.next(false);
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.signOut().then(response => {
                //todo remove all the cookies data
                this.cookieService.removeAll();
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    getUser() {
        let currentUser = this.firebaseAuth.auth.currentUser;
        console.log('currentUser ' + currentUser);
        let cookieObjects = this.cookieService.getAll();
        console.log('cookieObjects ' + cookieObjects);
        return Observable.of(cookieObjects);
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

    checkUserType(userId: string, token: string, apiKey : string){

        let headers = new Headers({
            'token': token,
            'apiKey': apiKey
        });

        let options = new RequestOptions({
            headers: headers
        });

        return new Promise((resolve, reject) => {
            this.http.get(environment.serverUrl + '/api/usertype?userId='+userId, options).subscribe(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }
}
