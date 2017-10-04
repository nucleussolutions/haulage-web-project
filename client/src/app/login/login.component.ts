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

    private response : any;

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
        // this.loginService.login(formData.value.email, formData.value.password).then(response => {
        //     this.response = response;
        //     this.cookieService.put('token', this.response.token);
        //     this.cookieService.put('userId', this.response.user._id);
        //     this.cookieService.put('userRole', this.response.user.role);
        //     //todo redirect them to the dashboard page
        //     // window.location.reload();
        //     this.router.navigate(['/index']);
        //     //todo signal refresh event on the nav drawer component
        //     this.loginService.changeLoginState(true);
        // }).catch(reason => {
        //     console.log('failed to login, reason '+JSON.stringify(reason));
        // });


        this.firebaseAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(response => {
            this.response = response;

            console.log('login response '+JSON.stringify(this.response));
            this.cookieService.put('token', this.response.accessToken);
            this.cookieService.put('refreshToken', this.response.refreshToken);
            this.cookieService.put('emailVerified', this.response.emailVerified);
            this.cookieService.put('expirationTime', this.response.expirationTime);

            //todo if email is not verified, pop up a dialog for them to verify email
            this.router.navigate(['/index']);



        }, error => {
            console.log('failed to login with reason '+error);
        });
    }
}
