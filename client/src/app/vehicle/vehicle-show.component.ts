import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';
import { CookieService } from 'ngx-cookie';
import {UserService} from "../user.service";

@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-show.component.html',
  providers: [UserService]
})
export class VehicleShowComponent implements OnInit {

  vehicle = new Vehicle();

  private userObject : any;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });

    this.route.params.subscribe((params: Params) => {
      this.vehicleService.get(+params['id'], this.userObject).subscribe((vehicle: Vehicle) => {
        this.vehicle = vehicle;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.vehicleService.destroy(this.vehicle, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/vehicle','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
