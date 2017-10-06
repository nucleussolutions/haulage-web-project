import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login.service";
import {Title} from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private titleService : Title, private cookieService: CookieService, private router: Router, private firebaseAuth: AngularFireAuth) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });

        this.titleService.setTitle('Login');
    }

    ngOnInit() {
    }

    login(formData) {
        // console.log('login formData '+JSON.stringify(formData));
        console.log('login email '+formData.value.email);
        console.log('login password '+formData.value.password);

        this.firebaseAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(response => {

            console.log('login response '+JSON.stringify(response));

            let responseStr = JSON.stringify(response);

            console.log('login response string '+responseStr);

            response = JSON.parse(responseStr);

            console.log('login response json parse '+response);

            this.cookieService.put('uid', response.uid);
            this.cookieService.put('emailVerified', response.emailVerified);
            this.cookieService.put('displayName', response.displayName);
            this.cookieService.put('photoUrl', response.photoURL);
            this.cookieService.put('apiKey', response.apiKey);
            this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
            this.cookieService.put('token', response.stsTokenManager.accessToken);
            this.cookieService.put('expirationTime', response.stsTokenManager.expirationTime);

            //todo if email is not verified, pop up a dialog for them to verify email



            this.router.navigate(['/index']);
        }, error => {
            console.log('failed to login with reason '+error);
        });
    }
}
