import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {AngularFireAuth} from "angularfire2/auth";
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { UserService } from 'app/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    private credentials: FormGroup;

    private verificationResponse : any;

    constructor(private formBuilder: FormBuilder, private titleService: Title, private router: Router, private modal: Modal, private userService : UserService) {
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
        this.userService.register(formData.value.email, formData.value.password).then(response => {
            this.modal.alert().title('Status')
            .message('Verification email has been sent to your inbox')
            .open();
        }, error => {
            this.modal.alert().title('Error').message(error).open();
            console.log('failed to register '+error);
        }).catch(error => {
            console.log('failed to register '+error.message);
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
