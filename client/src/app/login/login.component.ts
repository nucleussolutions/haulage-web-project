import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private credentials: FormGroup;

  constructor(private formBuilder: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.credentials = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });

    this.titleService.setTitle('Login');
  }

  ngOnInit() {
    this.userService.getUser().subscribe(userObject => {
      console.log('userObject '+JSON.stringify(userObject));
      if(userObject['uid']){
        this.router.navigate(['/index']);
      }
    }, error2 => {
      //not logged in
    });
  }

  login(formData) {
    // console.log('login formData '+JSON.stringify(formData));
    console.log('login email ' + formData.value.email);
    console.log('login password ' + formData.value.password);

    this.userService.login(formData.value.email, formData.value.password).then(response => {
      window.location.reload();
    }, error => {
      const errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = error;
    });
  }


}
