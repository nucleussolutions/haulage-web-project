import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';


@Injectable()
export class ResetPasswordService {

  constructor(private http: Http) { }

  resetPassword(password){
    return new Promise((resolve, reject) => {


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
