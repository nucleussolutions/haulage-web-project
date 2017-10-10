import {Component, OnInit} from '@angular/core';
import {VehicleService} from './vehicle.service';
import {Vehicle} from './vehicle';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

  vehicleList: Vehicle[] = [];

  private token : string;

  private apiKey : string;

  constructor(private vehicleService: VehicleService, private cookieService: CookieService, private modal : Modal, private titleService : Title) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');

    this.titleService.setTitle('Vehicles');
  }

  ngOnInit() {
    this.vehicleService.list(this.token, this.apiKey).subscribe((vehicleList: Vehicle[]) => {
      this.vehicleList = vehicleList;
    }, error => {
      let message;

      if(error.status === 401){
        message = 'Unauthorized';
      }else if(error.status === 500){
        message = 'Internal server error';
      }

      this.modal.alert().title('Error').message(message).open();
    });
  }
}
