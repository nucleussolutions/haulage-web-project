import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login.service";
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;


    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private titleService : Title) {
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

        }).catch(reason => {

        });
    }
}
