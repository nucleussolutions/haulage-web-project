import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';

@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-show.component.html'
})
export class VehicleShowComponent implements OnInit {

  vehicle = new Vehicle();

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.vehicleService.get(+params['id']).subscribe((vehicle: Vehicle) => {
        this.vehicle = vehicle;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.vehicleService.destroy(this.vehicle).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/vehicle','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
