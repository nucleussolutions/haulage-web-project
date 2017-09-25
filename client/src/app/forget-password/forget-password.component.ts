import { Component, OnInit } from '@angular/core';
import {ForgetPasswordService} from "../forget-password.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
    providers: [ForgetPasswordService]
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private forgetPasswordService: ForgetPasswordService) { }

  ngOnInit() {
  }

  requestReset(formData){
    this.forgetPasswordService.requestReset(formData.value.email).then(response => {

      //todo this should not be redirected anywhere except for the reset email has been sent modal dialog


    }, error => {
      //todo show a notify or modal dialog in case of failure
    });
  }

}
