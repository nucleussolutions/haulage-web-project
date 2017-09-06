import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {environment} from '../environments/environment';


@Injectable()
export class LoginService {

    constructor(private http: Http) {

    }

    login(email, password) {
        return new Promise((resolve, reject) => {

            let postBody = {
                email: email,
                password: password
            };

            this.http.post(environment.authUrl + '/login', postBody).subscribe(response => {
                resolve(response.json());
            }, error => {
                reject(error.json());
            });
        })
    }
}
