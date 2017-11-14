import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input()
  consignment = new Consignment();

  create = true;

  @Output() onAddConsignment = new EventEmitter<Consignment>();

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

  addConsignment(){
    //todo shoot an event to the parent, which is the transportrequest persist component to add consignment
    console.log('addConsignment');
    this.onAddConsignment.emit(this.consignment);
    this.dialog.dismiss();
  }

  deleteConsignment(id: number){
    //todo
  }

}