import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-error-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.css']
})
export class GeneralModalComponent implements OnInit {

  @Input() modalTitle;
  @Input() modalMessage;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
