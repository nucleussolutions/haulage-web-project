import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class ForgetPasswordService {

  constructor(private http: Http) { }

  requestReset(email){
    return new Promise((resolve, reject) => {

      let postBody = {
        email : email
      };

      this.http.post('', '').subscribe(response => {
        resolve(response.json());
      }, error => {
        reject(error.json());
      })
    });
  }
}
