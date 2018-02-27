import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

      // route 'enter' transition
      transition(':enter', [

        // css styles at start of transition
        style({ opacity: 0 }),

        // animation and styles at end of transition
        animate('.3s', style({ opacity: 1 }))
      ]),
    ]);

@Component({
  selector: 'app-error-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],
})
export class GeneralModalComponent implements OnInit {

  @Input() modalTitle;
  @Input() modalMessage;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.dismiss();
  }

}
