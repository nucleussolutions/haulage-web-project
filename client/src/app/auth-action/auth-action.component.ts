import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-verify-email',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.css']
})
export class AuthActionComponent implements OnInit {

  message: string;

  private credentials: FormGroup;

  private oobCode: string;

  mode: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.credentials = this.formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retypePassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    }, { validator: this.matchingPasswords('password', 'retypePassword') });
  }

  ngOnInit() {
    this.route.queryParams.flatMap(queryParams => {
      this.mode = queryParams['mode'];
      let oobCode = queryParams['oobCode'];

      if(this.mode == 'verifyEmail'){
        if(oobCode){
          return this.userService.verifyEmailWithCode(oobCode);
        }else{
          this.message = 'Email verification code not found';
        }
      }else if(this.mode == 'resetPassword'){
        this.oobCode = oobCode;
      }
    }).subscribe(value => {
      if(value){
        this.message = 'Verified. Please proceed to login.';
      }
    });
  }

  resetPassword(formData) {
    this.userService.confirmPasswordReset(this.oobCode, formData.value.password).then(response => {
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
