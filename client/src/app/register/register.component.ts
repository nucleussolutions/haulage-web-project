import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  private credentials: FormGroup;

  private verificationResponse: any;

  @ViewChild('verificationsentmodal') private content;

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
      let modalRef = this.modalService.open(GeneralModalComponent);
      modalRef.componentInstance.modalTitle = 'Success';
      modalRef.componentInstance.modalMessage = 'Email verification sent. Check your email';
    }, error => {
      let modalRef = this.modalService.open(GeneralModalComponent);
      modalRef.componentInstance.modalTitle = 'Error';
      modalRef.componentInstance.modalMessage = error;
    }).catch(error => {
      let modalRef = this.modalService.open(GeneralModalComponent);
      modalRef.componentInstance.modalTitle = 'Error';
      modalRef.componentInstance.modalMessage = error;
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
