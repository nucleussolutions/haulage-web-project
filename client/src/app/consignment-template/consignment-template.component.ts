import { Component, OnInit, OnDestroy } from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {ConsignmentService} from "../consignment/consignment.service";
import { Subscription } from 'rxjs/Subscription';
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {TransportRequestService} from "../transportRequest/transportRequest.service";

@Component({
  selector: 'app-consignment-template',
  templateUrl: './consignment-template.component.html',
  styleUrls: ['./consignment-template.component.css']
})
export class ConsignmentTemplateComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  consignment: Consignment;

  private userObject:any;

  private subscription: Subscription;

  haulierInfo: HaulierInfo;

  forwarderInfo: ForwarderInfo;

  constructor(private userService: UserService, private route: ActivatedRoute, private consignmentService: ConsignmentService, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private modal: Modal, private transportRequestService: TransportRequestService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.consignmentService.get(params['id'], this.userObject);
    }).subscribe(consignment => {
      this.consignment = consignment;
      //consignment.transportRequest doesnt make sense
      this.transportRequestService.get(this.consignment.transportRequest.id, this.userObject).subscribe(transportRequest => {
        this.consignment.transportRequest = transportRequest;
        console.log('consignment.transportRequest '+this.consignment.transportRequest);
        //much better
      });

      //todo call haulier and forwarder info based on consignment
      this.forwarderInfoService.getByUserId(this.consignment.transportRequest.forwarderId, this.userObject).subscribe(forwarderInfo => {
        this.forwarderInfo = forwarderInfo;
      });

      //get job number by consignment id?

    }, error => {
      let message;
      if(error.status == 400){
        message = 'Bad request';
      }else if(error.status == 500){
        message = 'Internal server error';
      }else if(error.status == 404){
        message = 'Not found';
      }

      this.modal.alert().title('Error').message(message).open();
    });
  }


}
