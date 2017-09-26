import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ChangePasswordService} from "../change-password.service";
import {CookieService} from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    providers: [ChangePasswordService, CookieService]
})
export class ChangePasswordComponent implements OnInit {

    private credentials: FormGroup;

    private token : string;

    constructor(private formBuilder: FormBuilder, private changePasswordService: ChangePasswordService, private cookieService: CookieService, public modal: Modal, private router: Router) {
        this.credentials = this.formBuilder.group({
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, {validator: this.matchingPasswords('password', 'confirmPassword')});

        this.token = this.cookieService.get('token');
    }


    ngOnInit() {
    }

    changePassword(formData) {
        this.changePasswordService.changePassword(formData.value.password, this.token).then(response => {

            //todo clear cookies
            this.cookieService.removeAll();
            this.router.navigate(['/login']);

        }, error => {
            this.modal.alert()
                .title('Error')
                .body('Failed to change password, reason '+error)
                .open();
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
