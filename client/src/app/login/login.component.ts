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
        this.loginService.login(formData.value.email, formData.value.password).then(response => {
            this.response = response;
            this.cookieService.put('token', this.response.token);
            //todo redirect them to the dashboard page
            this.router.navigate(['/index']);
        }).catch(reason => {
            console.log('failed to login, reason '+reason);
        });
    }
}
