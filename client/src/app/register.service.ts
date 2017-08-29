import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';


@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(email, password, isHaulier){
    return new Promise((resolve, reject) => {
      this.http.get('').subscribe(resolve => {

      }, reject => {

      });
    })
  }
}
