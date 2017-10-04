import {Component, OnInit} from '@angular/core';
import {ResetPasswordService} from "../reset-password.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie";
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {

    private credentials: FormGroup;

    private resetCode: string;

    constructor(private resetPasswordService: ResetPasswordService, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private cookieService: CookieService, public modal: Modal, private firebaseAuth: AngularFireAuth) {
        this.credentials = this.formBuilder.group({
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, {validator: this.matchingPasswords('password', 'retypePassword')});

        this.titleService.setTitle('Reset Password');
    }

    ngOnInit() {
        //todo get code from url


        //todo verify password reset code
        // this.firebaseAuth.auth.verifyPasswordResetCode()
    }

    resetPassword(formData) {
        // this.resetPasswordService.resetPassword(formData.value.password).then(response => {
        //     //todo show success message using modal dialog or growl notification
        //
        //     //todo redirect to login
        //     this.cookieService.removeAll();
        //     this.router.navigate(['/login']);
        // }, error => {
        //     //todo show error message using a modal dialog or growl notification
        //     this.modal.alert()
        //         .title('Error').body('').open();
        // });


        this.firebaseAuth.auth.confirmPasswordReset(this.resetCode, formData.value.password).then(response => {
            this.cookieService.removeAll();
            this.router.navigate(['/login']);
        }, error => {
            console.log('failed to reset password ' + error);

        }).then(error => {
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
