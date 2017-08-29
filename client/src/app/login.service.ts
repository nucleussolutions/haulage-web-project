import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';


@Injectable()
export class LoginService {

    constructor(private http: Http) {

    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.http.post('', '').subscribe(resolve => {

            }, reject => {

            });
        })
    }
}
