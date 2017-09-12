import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {

  private credentials : FormGroup;

  constructor(private formBuilder: FormBuilder) {
      this.credentials = this.formBuilder.group({
          // email: ['', Validators.compose([Validators.required, Validators.email])],
          // password: ['', Validators.required],
      });
  }


  ngOnInit() {
  }

  changePassword(formData){

  }

}
