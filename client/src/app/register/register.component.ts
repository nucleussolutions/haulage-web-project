import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from 'app/user.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  private credentials: FormGroup;

  private verificationResponse: any;

  constructor(private formBuilder: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.credentials = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    }, {validator: this.matchingPasswords('password', 'retypePassword')});

    this.titleService.setTitle('Register');
  }

  ngOnInit() {
  }

  closeResult: string;

  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  register(formData) {
    this.userService.register(formData.value.email, formData.value.password).then(response => {
      // this.modal.alert().title('Status')
      // .message('Verification email has been sent to your inbox')
      // .open();
      this.openModal('verificationsentmodal');
    }, error => {
      // this.modal.alert().title('Error').message(error).open();
      console.log('failed to register ' + error);
    }).catch(error => {
      console.log('failed to register ' + error.message);
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
