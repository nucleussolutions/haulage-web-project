import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordService } from "../change-password.service";
import { CookieService } from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    providers: [ChangePasswordService, UserService]
})
export class ChangePasswordComponent implements OnInit {

    private credentials: FormGroup;

    private userObject: any;

    private subscription: Subscription;

    private code: string;

    constructor(private formBuilder: FormBuilder, private changePasswordService: ChangePasswordService, public modal: Modal, private router: Router, private userService: UserService) {
        this.credentials = this.formBuilder.group({
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, { validator: this.matchingPasswords('password', 'confirmPassword') });

        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });


        //todo get reset code from url


    }


    ngOnInit() {
    }

    changePassword(formData) {
        this.userService.changePassword(this.code, formData.value.password).then(response => {
            this.modal.alert()
            .title('Status')
            .message('Password change success')
            .open();
        }, error => {
            this.modal.alert()
                .title('Error')
                .body('Failed to change password, reason ' + error)
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
