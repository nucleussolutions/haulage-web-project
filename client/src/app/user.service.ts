import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {User} from "./user/user";
import {environment} from "../environments/environment";

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    //todo fix url mappings
    list(): Observable<User[]> {
        let subject = new Subject<User[]>();
        this.http.get(environment.serverUrl + '/user')
            .map((r: Response) => r.json())
            .subscribe((json: any[]) => {
                subject.next(json.map((item: any) => new User(item)))
            });
        return subject.asObservable();
    }

    get(id: string): Observable<User> {
        return this.http.get(environment.serverUrl + '/user/'+id)
            .map((r: Response) => new User(r.json()));
    }

    // save(User: User): Observable<User> {
    //     const requestOptions = new RequestOptions();
    //     if (User.id) {
    //         requestOptions.method = RequestMethod.Put;
    //         requestOptions.url = environment.serverUrl + '/user/' + User.id;
    //     } else {
    //         requestOptions.method = RequestMethod.Post;
    //         requestOptions.url = environment.serverUrl + '/user';
    //     }
    //     requestOptions.body = JSON.stringify(User);
    //     requestOptions.headers = new Headers({"Content-Type": "application/json"});
    //
    //     return this.http.request(new Request(requestOptions))
    //         .map((r: Response) => new User(r.json()));
    // }
}
