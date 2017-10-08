import {Component, OnInit} from '@angular/core';
import {VehicleService} from './vehicle.service';
import {Vehicle} from './vehicle';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  vehicleList: Vehicle[] = [];

  private token : string;

  private apiKey : string;

  constructor(private vehicleService: VehicleService, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.vehicleService.list(this.token, this.apiKey).subscribe((vehicleList: Vehicle[]) => {
      this.vehicleList = vehicleList;
    });
  }
}
