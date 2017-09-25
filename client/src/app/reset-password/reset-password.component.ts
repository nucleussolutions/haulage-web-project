import {Component, OnInit} from '@angular/core';
import {ResetPasswordService} from "../reset-password.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {

    private credentials: FormGroup;


    constructor(private resetPasswordService: ResetPasswordService, private formBuilder: FormBuilder, private router: Router, private titleService : Title) {
        this.credentials = this.formBuilder.group({
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    ngOnInit() {
    }

    resetPassword(formData) {
        this.resetPasswordService.resetPassword(formData.value.password).then(response => {
            //todo show success message using modal dialog or growl notification

            //todo redirect to login
            this.router.navigate(['/login']);
        }, error => {
            //todo show error message using a modal dialog or growl notification
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
