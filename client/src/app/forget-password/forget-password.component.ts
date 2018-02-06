import {Component, OnInit} from '@angular/core';
import {ForgetPasswordService} from "../forget-password.service";
// import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from 'app/user.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";


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

  constructor(private firebaseAuth: AngularFireAuth, private formBuilder: FormBuilder, private userService: UserService, private modalService: NgbModal) {
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

      let modalRef = this.modalService.open(GeneralModalComponent);
      modalRef.componentInstance.modalTitle = 'Success';
      modalRef.componentInstance.modalMessage = 'Password reset link will be sent to your email.';

    }, error => {
      this.error = error;
      console.log('failed to send reset email ' + this.error);
    }).catch(error => {
      this.error = error;
      console.log('failed to send reset email ' + this.error);
    });
  }

}
