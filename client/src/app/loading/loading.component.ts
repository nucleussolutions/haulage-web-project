import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
}


// export class LoadingCustomModalContext extends BSModalContext {
//   message: string;
// }