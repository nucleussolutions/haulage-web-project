import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';


@Injectable()
export class ChangePasswordService {

    constructor(private http: Http) {

    }

    changePassword(password, token) {
        return new Promise((resolve, reject) => {

            //todo include token in the header so that api call goes through


            let postBody = {
                password : password
            };

            this.http.post('', postBody).subscribe(response => {
                resolve(response.json());
            }, error => {
                reject(error.json());
            });
        });
    }
}
