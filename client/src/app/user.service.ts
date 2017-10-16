import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { User } from "./user/user";
import { environment } from "../environments/environment";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {

    constructor(private http: Http, private firebaseAuth: AngularFireAuth) {
    }

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    login(email: string, password, string) {
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.firebaseAuth.auth.signOut().then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }
}
