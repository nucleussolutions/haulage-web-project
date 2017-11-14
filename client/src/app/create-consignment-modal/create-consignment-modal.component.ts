import { Component, OnInit } from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";

@Component({
  selector: 'app-create-consignment-modal',
  templateUrl: './create-consignment-modal.component.html',
  styleUrls: ['./create-consignment-modal.component.css']
})
export class CreateConsignmentModalComponent implements OnInit, CloseGuard, ModalComponent<BSModalContext> {

  context: BSModalContext;

  consignment = new Consignment();

  create = true;

  beforeClose(): boolean | Promise<boolean>{
    return false;
  }

  beforeDismiss(): boolean | Promise<boolean>{
    return false;
  }


  constructor(public dialog: DialogRef<BSModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit() {

  }

  addConsignment(consignment: Consignment){
    //todo shoot an event to the parent, which is the transportrequest persist component to add consignment

  }

  deleteConsignment(id: number){
    //todo
  }

}