import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {CookieService} from "ngx-cookie";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html',
  providers: [UserService]
})
export class ConsignmentListComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private userObject : any;

  private subscription : Subscription;

  consignmentList: Consignment[] = [];

  constructor(private consignmentService: ConsignmentService, private modal : Modal, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.consignmentService.list(this.userObject.token, this.userObject.apiKey).subscribe((consignmentList: Consignment[]) => {
      this.consignmentList = consignmentList;
    }, error => {
      let message;

      if(error.status === 401){
        message = 'Unauthorized'
      }else if(error.status === 500){
        message = 'Internal server error';
      }else if(error.status === 400){
        message = 'Bad request';
      }

      this.modal.alert().title('Error').message(message).open();
    });
  }
}
