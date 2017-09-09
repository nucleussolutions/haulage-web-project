import {Component, OnInit} from '@angular/core';
import {VehicleService} from './vehicle.service';
import {Vehicle} from './vehicle';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  vehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.list().subscribe((vehicleList: Vehicle[]) => {
      this.vehicleList = vehicleList;
    });
  }
}
