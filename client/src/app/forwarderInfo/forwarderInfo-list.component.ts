import {Component, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';

@Component({
  selector: 'forwarderInfo-list',
  templateUrl: './forwarderInfo-list.component.html'
})
export class ForwarderInfoListComponent implements OnInit {

  forwarderInfoList: ForwarderInfo[] = [];

  constructor(private forwarderInfoService: ForwarderInfoService) { }

  ngOnInit() {
    this.forwarderInfoService.list().subscribe((forwarderInfoList: ForwarderInfo[]) => {
      this.forwarderInfoList = forwarderInfoList;
    });
  }
}
