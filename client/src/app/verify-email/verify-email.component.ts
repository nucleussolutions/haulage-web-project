import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  message: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.queryParams.flatMap(queryParams => {
      let mode = queryParams['mode'];
      let oobCode = queryParams['oobCode'];
      if(oobCode){
        return this.userService.verifyEmailWithCode(oobCode);
      }else{
        this.message = 'Email verification code not found';
      }
    }).subscribe(value => {
      if(value){
        this.message = 'Verified. Please proceed to login.';
      }
    });
  }

}
