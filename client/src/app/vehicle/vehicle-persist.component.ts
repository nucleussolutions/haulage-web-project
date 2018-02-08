import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Vehicle} from './vehicle';
import {VehicleService} from './vehicle.service';
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {PermissionService} from "../permission/permission.service";
import {Observable} from "rxjs/Observable";
import {Permission} from "../permission/permission";


@Component({
  selector: 'vehicle-persist',
  templateUrl: './vehicle-persist.component.html'
})
export class VehiclePersistComponent implements OnInit {

  vehicle = new Vehicle();
  create = true;
  errors: any[];

  private userObject: any;

  private formGroup: FormGroup;

  private permissions: Permission[];

  minDate: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private userService: UserService, private haulierInfoService: HaulierInfoService, private permissionService: PermissionService) {

    let date = new Date();

    this.minDate = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay()
    };
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
        this.permissions = permissions;
        //autofill userId with haulier id from userObject
        this.vehicle.userId = this.userObject.uid;
      });

      if (params.hasOwnProperty('id')) {
        return this.vehicleService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found, moving along';
      }
    }).subscribe((vehicle: Vehicle) => {
      this.create = false;
      this.vehicle = vehicle;
    });
  }

  save() {
    this.vehicleService.save(this.vehicle, this.userObject).subscribe((vehicle: Vehicle) => {
      this.router.navigate(['/vehicle', 'show', vehicle.id]);
    }, (json) => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }
}
