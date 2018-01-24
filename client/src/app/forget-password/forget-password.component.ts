import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from "../forget-password.service";
// import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { UserService } from 'app/user.service';


@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css'],
    providers: [UserService]
})
export class ForgetPasswordComponent implements OnInit {

    private credentials: FormGroup;

    private response: any;

    private error: any;

    constructor(private firebaseAuth: AngularFireAuth, private formBuilder: FormBuilder, private userService: UserService) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
        })
    }

    ngOnInit() {
    }

    requestReset(formData) {
        console.log('email ' + formData.value.email);
        this.userService.sendPasswordResetEmail(formData.value.email).then(response => {
            this.response = response;
            console.log('forget password response ' + this.response);
            // this.modal.alert()
            //     .title('Success')
            //     .body('Password reset link will be sent to your email.')
            //     .open();
        }, error => {
            this.error = error;
            console.log('failed to send reset email ' + this.error);
        }).catch(error => {
            this.error = error;
            console.log('failed to send reset email ' + this.error);
        });
    }

}
