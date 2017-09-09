import {Component, OnInit} from '@angular/core';
import {DriverInfoService} from './driverInfo.service';
import {DriverInfo} from './driverInfo';

@Component({
  selector: 'driverInfo-list',
  templateUrl: './driverInfo-list.component.html'
})
export class DriverInfoListComponent implements OnInit {

  driverInfoList: DriverInfo[] = [];

  constructor(private driverInfoService: DriverInfoService) { }

  ngOnInit() {
    this.driverInfoService.list().subscribe((driverInfoList: DriverInfo[]) => {
      this.driverInfoList = driverInfoList;
    });
  }
}
