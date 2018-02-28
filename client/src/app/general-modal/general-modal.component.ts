import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

// import the required animation functions from the angular animations module
@Component({
  selector: 'app-error-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.css'],
  // make fade in animation available to this component
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

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
