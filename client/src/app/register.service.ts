import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {environment} from '../environments/environment';


@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(email, password, userType){
    return new Promise((resolve, reject) => {

      let postBody = {
        email: email,
        password : password,
        type: userType
      };

      this.http.post(environment.authUrl+'/register', postBody).subscribe(response => {
        resolve(response.json());
      }, error => {
        reject(error.json());
      });
    })
  }
}
