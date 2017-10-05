import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {AngularFireAuth} from "angularfire2/auth";
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    private credentials: FormGroup;

    private response : any;

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private titleService: Title, private router: Router, private cookieService: CookieService, private firebaseAuth: AngularFireAuth, private modal: Modal) {
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

        this.firebaseAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(response => {
            this.response = response;

            console.log('register response '+JSON.stringify(this.response));

            this.cookieService.put('token', this.response.stsTokenManager.accessToken);
            this.cookieService.put('refreshToken', this.response.stsTokenManager.refreshToken);
            this.cookieService.put('emailVerified', this.response.emailVerified);
            this.cookieService.put('expirationTime', this.response.stsTokenManager.expirationTime);
            this.cookieService.put('displayName', this.response.displayName);
            this.cookieService.put('photoUrl', this.response.photoURL);


            this.router.navigate(['/index']);

            this.modal.alert().title('Status')
                .message('Verification email has been sent to your inbox')
                .open();

        }, error => {
            this.modal.alert().title('Error').message(error).open();
            console.log('failed to register '+error);
        }).catch(error => {
            console.log('failed to register '+error.message);
        })
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
