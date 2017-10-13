import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {AngularFireAuth} from "angularfire2/auth";
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { NavDrawerService } from 'app/nav-drawer.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    private credentials: FormGroup;

    private verificationResponse : any;

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private titleService: Title, private router: Router, private cookieService: CookieService, private firebaseAuth: AngularFireAuth, private modal: Modal, private navDrawerService : NavDrawerService) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        }, {validator: this.matchingPasswords('password', 'retypePassword')});

        this.titleService.setTitle('Register');
    }

    ngOnInit() {
    }

    register(formData) {

        this.firebaseAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(response => {

            console.log('register response '+JSON.stringify(response));

            let responseStr = JSON.stringify(response);

            response = JSON.parse(responseStr);

            this.cookieService.put('uid', response.uid);
            this.cookieService.put('emailVerified', response.emailVerified);
            this.cookieService.put('displayName', response.displayName);
            this.cookieService.put('photoUrl', response.photoURL);
            this.cookieService.put('apiKey', response.apiKey);
            this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
            this.cookieService.put('token', response.stsTokenManager.accessToken);
            this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);

            this.navDrawerService.trigger(true);
            this.router.navigate(['/index']);

            this.firebaseAuth.auth.currentUser.sendEmailVerification().then(verificationResponse => {
                this.verificationResponse = verificationResponse;
                console.log('send email verification response '+JSON.stringify(this.verificationResponse));
                this.modal.alert().title('Status')
                    .message('Verification email has been sent to your inbox')
                    .open();
            }, error => {
                this.modal.alert().title('Error').message(error).open();
            });

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
