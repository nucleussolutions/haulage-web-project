import {Component, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html'
})
export class ConsignmentListComponent implements OnInit {

  consignmentList: Consignment[] = [];

  constructor(private consignmentService: ConsignmentService) { }

  ngOnInit() {
    this.consignmentService.list().subscribe((consignmentList: Consignment[]) => {
      this.consignmentList = consignmentList;
    });
  }
}
