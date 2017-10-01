import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login.service";
import {Title} from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import {Router} from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;

    private response : any;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private titleService : Title, private cookieService: CookieService, private router: Router) {
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
        this.loginService.login(formData.value.email, formData.value.password).then(response => {
            this.response = response;
            this.cookieService.put('token', this.response.token);
            this.cookieService.put('userId', this.response.user._id);
            this.cookieService.put('userRole', this.response.user.role);
            //todo redirect them to the dashboard page
            // window.location.reload();
            this.router.navigate(['/index']);
            //todo signal refresh event on the nav drawer component
            this.loginService.changeLoginState(true);
        }).catch(reason => {
            console.log('failed to login, reason '+JSON.stringify(reason));
        });
    }
}
