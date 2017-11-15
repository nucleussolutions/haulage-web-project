import {Component, OnInit} from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
import {CreateConsignmentEventService} from "../create-consignment-event.service";

@Component({
  selector: 'app-create-consignment-modal',
  templateUrl: './create-consignment-modal.component.html',
  styleUrls: ['./create-consignment-modal.component.css'],
  providers: [CreateConsignmentEventService]
})
export class CreateConsignmentModalComponent implements OnInit, CloseGuard, ModalComponent<BSModalContext> {

  context: BSModalContext;

  consignment: Consignment;

  create = true;

  beforeClose(): boolean | Promise<boolean>{
    return false;
  }

  beforeDismiss(): boolean | Promise<boolean>{
    return false;
  }

  constructor(public dialog: DialogRef<BSModalContext>, private createConsignmentEventService: CreateConsignmentEventService) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.consignment = new Consignment();
  }

  ngOnInit() {

  }

  addConsignment(){
    console.log('add consignment emit');
    this.createConsignmentEventService.createConsignment(this.consignment);
    this.dialog.close(this.consignment);
  }

  deleteConsignment(id: number){
    //todo
  }

}