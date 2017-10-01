import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {environment} from '../environments/environment';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LoginService {

    private loginStateChangedSource = new Subject<boolean>();


    loginStateChanged$ = this.loginStateChangedSource.asObservable();

    constructor(private http: Http) {

    }

    login(email, password) {
        return new Promise((resolve, reject) => {

            let postBody = {
                email: email,
                password: password
            };

            this.http.post(environment.serverUrl + '/api/auth/login', postBody).subscribe(response => {
                resolve(response.json());
            }, error => {
                reject(error.json());
            });
        })
    }

    changeLoginState(loggedIn) {
        this.loginStateChangedSource.next(loggedIn);
    }
}
