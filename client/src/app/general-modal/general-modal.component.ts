import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-error-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class GeneralModalComponent implements OnInit {

  @Input() modalTitle;
  @Input() modalMessage;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
