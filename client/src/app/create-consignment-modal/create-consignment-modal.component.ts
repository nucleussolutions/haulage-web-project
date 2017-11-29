import {Component, OnInit} from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
import {CreateConsignmentEventService} from "../create-consignment-event.service";
import {ConsignmentService} from "../consignment/consignment.service";

@Component({
  selector: 'app-create-consignment-modal',
  templateUrl: './create-consignment-modal.component.html',
  styleUrls: ['./create-consignment-modal.component.css'],
  providers: [CreateConsignmentEventService]
})
export class CreateConsignmentModalComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;

  consignment: Consignment;

  create = true;

  beforeClose(): boolean | Promise<boolean>{
    return false;
  }

  beforeDismiss(): boolean | Promise<boolean>{
    return false;
  }

  constructor(public dialog: DialogRef<CustomModalContext>, private createConsignmentEventService: CreateConsignmentEventService, consignmentService: ConsignmentService) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    if(!this.context.consignment){
      this.consignment = new Consignment();
      this.consignment.status = 'Pending';
    }else{
      this.consignment = this.context.consignment;
      this.create = false;
    }
  }

  ngOnInit() {

  }

  addConsignment(){
    console.log('add consignment emit');

    if(this.create == true){
      this.createConsignmentEventService.createConsignment(this.consignment);
    }else{
      //todo edit existing consignment
    }
    this.dialog.close(this.consignment);
  }

  deleteConsignment(id: number){
    //todo
  }

}

export class CustomModalContext extends BSModalContext {
  public create: boolean;
  public consignment: Consignment;
}