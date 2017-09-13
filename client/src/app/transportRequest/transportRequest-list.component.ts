import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';

@Component({
  selector: 'transportRequest-list',
  templateUrl: './transportRequest-list.component.html'
})
export class TransportRequestListComponent implements OnInit {

  transportRequestList: TransportRequest[] = [];

  constructor(private transportRequestService: TransportRequestService) { }

  ngOnInit() {
    this.transportRequestService.list().subscribe((transportRequestList: TransportRequest[]) => {
      this.transportRequestList = transportRequestList;
    });
  }
}
