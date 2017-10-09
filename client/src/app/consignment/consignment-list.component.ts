import {Component, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html'
})
export class ConsignmentListComponent implements OnInit {

  consignmentList: Consignment[] = [];

  private token : string;

  private apiKey : string;

  constructor(private consignmentService: ConsignmentService, private modal : Modal, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.consignmentService.list(this.token, this.apiKey).subscribe((consignmentList: Consignment[]) => {
      this.consignmentList = consignmentList;
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }
}
