import {Component, Input, OnInit} from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {CreateConsignmentEventService} from "../create-consignment-event.service";
import {NgbActiveModal, NgbCalendar, NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-consignment-modal',
  templateUrl: './create-consignment-modal.component.html',
  styleUrls: ['./create-consignment-modal.component.css'],
  providers: [CreateConsignmentEventService]
})
export class CreateConsignmentModalComponent implements OnInit {

  @Input() consignment: Consignment;

  create: boolean = true;

  selectedDate: any;

  constructor(private createConsignmentEventService: CreateConsignmentEventService, public activeModal: NgbActiveModal) {

    console.log('consignment '+this.consignment);

    if(!this.consignment){
      this.consignment = new Consignment();
      this.consignment.status = 'Pending';
    }else{
      this.create = false;
    }
  }

  ngOnInit() {

  }

  addConsignment() {
    console.log('add consignment emit');

    if (this.create == true) {
      this.createConsignmentEventService.createConsignment(this.consignment);
    } else {
      //todo edit existing consignment
      this.createConsignmentEventService.editConsignment(this.consignment);
    }
  }

  deleteConsignment(id: number) {
    //todo
    this.createConsignmentEventService.deleteConsignment(this.consignment);
  }

}