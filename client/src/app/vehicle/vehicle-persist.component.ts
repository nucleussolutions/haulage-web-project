import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';
import {Response} from "@angular/http";
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-persist.component.html'
})
export class VehiclePersistComponent implements OnInit {

  vehicle = new Vehicle();
  create = true;
  errors: any[];

  private token : string;

  private apiKey: string;


  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.vehicleService.get(+params['id'], this.token, this.apiKey).subscribe((vehicle: Vehicle) => {
          this.create = false;
          this.vehicle = vehicle;
        });
      }
    });
  }

  save() {
    this.vehicleService.save(this.vehicle, this.token, this.apiKey).subscribe((vehicle: Vehicle) => {
      this.router.navigate(['/vehicle', 'show', vehicle.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
