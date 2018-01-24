import { Component, OnInit, OnDestroy } from '@angular/core';
import { Consignment } from "../consignment/consignment";
import { UserService } from "../user.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import { ConsignmentService } from "../consignment/consignment.service";
import { Subscription } from 'rxjs/Subscription';
import { HaulierInfo } from "../haulierInfo/haulierInfo";
import { ForwarderInfo } from "../forwarderInfo/forwarderInfo";
import { HaulierInfoService } from "../haulierInfo/haulierInfo.service";
import { ForwarderInfoService } from "../forwarderInfo/forwarderInfo.service";
import { TransportRequestService } from "../transportRequest/transportRequest.service";
import { JobService } from "../job/job.service";
import { TransportRequest } from 'app/transportRequest/transportRequest';

@Component({
  selector: 'app-consignment-template',
  templateUrl: './consignment-template.component.html',
  styleUrls: ['./consignment-template.component.css']
})
export class ConsignmentTemplateComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  consignment: Consignment;

  private userObject: any;

  private subscription: Subscription;

  haulierInfo: HaulierInfo;

  forwarderInfo: ForwarderInfo;

  constructor(private userService: UserService, private route: ActivatedRoute, private consignmentService: ConsignmentService, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private transportRequestService: TransportRequestService, private jobService: JobService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.consignmentService.get(params['id'], this.userObject);
      } else {
        throw 'param id not found'
      }
    }).flatMap(consignment => {
      this.consignment = consignment;
      return this.transportRequestService.get(this.consignment.transportRequest.id, this.userObject);
    }).flatMap(transportRequest => {
      this.consignment.transportRequest = transportRequest;
      console.log('consignment.transportRequest ' + this.consignment.transportRequest);
      return this.forwarderInfoService.getByUserId(this.consignment.transportRequest.forwarderId, this.userObject);
    }).subscribe(forwarderInfo => {
      this.forwarderInfo = forwarderInfo;

      // this.print();
      window.print();
    }, error => {
      let message;
      if (error.status == 400) {
        message = 'Bad request';
      } else if (error.status == 500) {
        message = 'Internal server error';
      } else if (error.status == 404) {
        message = 'Not found';
      }

      // this.modal.alert().title('Error').message(message).open();
    });
  }

  print(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    console.log('printContents '+printContents);
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    console.log('popupWin '+popupWin);
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</html>');
    popupWin.document.close();
  }

}
