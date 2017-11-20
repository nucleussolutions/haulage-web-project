import { Component, OnInit } from '@angular/core';
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, CloseGuard, ModalComponent<LoadingCustomModalContext> {

  context: LoadingCustomModalContext;

  constructor(public dialog: DialogRef<LoadingCustomModalContext>) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit() {
  }

  beforeDismiss?(): boolean | Promise<boolean> {
    return false;
  }

  beforeClose?(): boolean | Promise<boolean>{
    return false;
  }

}


export class LoadingCustomModalContext extends BSModalContext {
  message: string;
}