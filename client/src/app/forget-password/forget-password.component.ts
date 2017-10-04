import { Component, OnInit } from '@angular/core';
import {ForgetPasswordService} from "../forget-password.service";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
    providers: [ForgetPasswordService]
})
export class ForgetPasswordComponent implements OnInit {

  private credentials : FormGroup;

  constructor(private forgetPasswordService: ForgetPasswordService, public modal: Modal, private firebaseAuth: AngularFireAuth, private formBuilder: FormBuilder) {
      this.credentials = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
      })
  }

  ngOnInit() {
  }

  requestReset(formData){
    // this.forgetPasswordService.requestReset(formData.value.email).then(response => {
    //
    //   //todo this should not be redirected anywhere except for the reset email has been sent modal dialog
    //     this.modal.alert()
    //         .title('Success')
    //         .body('Password reset link will be sent to your email.')
    //         .open();
    //
    // }, error => {
    //   //todo show a notify or modal dialog in case of failure
    //
    //
    //     this.modal.alert()
    //         .title('Error')
    //         .body('Failed to change password, reason '+error)
    //         .open();
    //
    //
    // });
      console.log('email '+formData.value.email);
      this.firebaseAuth.auth.sendPasswordResetEmail(formData.value.email).then(response => {
          this.modal.alert()
                  .title('Success')
                  .body('Password reset link will be sent to your email.')
                  .open();
      }, error => {
        console.log('failed to send reset email '+error);
      }).then(error => {
        console.log('failed to send reset email '+error.message);
      })
  }

}
