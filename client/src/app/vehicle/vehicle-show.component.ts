import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-show.component.html'
})
export class VehicleShowComponent implements OnInit {

  vehicle = new Vehicle();

  private token : string;

  private apiKey: string;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.vehicleService.get(+params['id'], this.token, this.apiKey).subscribe((vehicle: Vehicle) => {
        this.vehicle = vehicle;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.vehicleService.destroy(this.vehicle, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/vehicle','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
