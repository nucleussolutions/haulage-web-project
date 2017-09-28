import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {CookieOptionsProvider} from "ngx-cookie/src/cookie-options-provider";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    private credentials: FormGroup;

    private response : any;

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private titleService: Title, private router: Router, private cookieService: CookieService) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            role: new FormControl('Admin'),
        }, {validator: this.matchingPasswords('password', 'retypePassword')});

        this.titleService.setTitle('Register');
    }

    ngOnInit() {
    }

    register(formData) {
        this.registerService.register(formData.value.email, formData.value.password, formData.value.role).then(response => {

            this.response = response;
            this.cookieService.put('token', this.response.token);
            this.router.navigate(['/index']);

        }).catch(reason => {
            console.log('failed to register with reason '+reason);

        });
    }


    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
}
