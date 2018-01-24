import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from "../reset-password.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { UserService } from 'app/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {

    private credentials: FormGroup;

    private resetCode: string;

    constructor(private formBuilder: FormBuilder, private router: Router, private titleService: Title, private userService: UserService) {
        this.credentials = this.formBuilder.group({
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, { validator: this.matchingPasswords('password', 'retypePassword') });

        this.titleService.setTitle('Reset Password');
    }

    ngOnInit() {
        //todo get password reset code
        // this.userService.verifyPasswordResetCode()
    }

    resetPassword(formData) {
        this.userService.confirmPasswordReset(this.resetCode, formData.value.password).then(response => {
            this.router.navigate(['/login']);
        }, error => {
            console.log('failed to reset password ' + error);
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
