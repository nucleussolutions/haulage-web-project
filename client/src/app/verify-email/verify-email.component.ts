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

  constructor(private route: ActivatedRoute, private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.queryParams.flatMap(queryParams => {
      let mode = queryParams['mode'];
      let oobCode = queryParams['oobCode'];
      if(oobCode){
        return this.userService.verifyEmailWithCode(oobCode);
      }else{
        const errorModalRef = this.modalService.open(GeneralModalComponent);
        errorModalRef.componentInstance.modalTitle = 'Error';
        errorModalRef.componentInstance.modalMessage = 'Email verification code not found';
      }
    }).subscribe(value => {
      if(value){
        const successModalRef = this.modalService.open(GeneralModalComponent);
        successModalRef.componentInstance.modalTitle = 'Success';
        successModalRef.componentInstance.modalMessage = 'Email verified. Proceed to login';
      }
    });
  }

}
