import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-show.component.html',
})
export class VehicleShowComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  vehicle = new Vehicle();

  private userObject : any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.vehicleService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found';
      }
    }).subscribe((vehicle: Vehicle) => {
      this.vehicle = vehicle;
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
