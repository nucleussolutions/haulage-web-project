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

  private permission: Permission;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router, private userService: UserService, private haulierInfoService: HaulierInfoService, private permissionService: PermissionService) {


    this.formGroup = this.formBuilder.group({
      internalNumber: ['', Validators.compose([Validators.required])],
      registrationNumber: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      roadTaxRenewalDate: ['', Validators.compose([Validators.required])],
      licenseExpiryDate: ['', Validators.compose([Validators.required])],
      puspakomExpiryDate: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      licensePlateNumber: ['', Validators.compose([Validators.required])],
      netWeight: ['', Validators.compose([Validators.required])],
      spadPermitExpiryDate: ['', Validators.compose([Validators.required])],
      insuranceExpiryDate: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      this.permissionService.getByUserId(this.userObject).subscribe(permission => {
        this.permission = permission;
        //todo autofill userId with haulier id from userObject

        if(this.permission.authority == 'Admin'){
          this.vehicle.userId = this.userObject.uid;
        }
      });

      if (params.hasOwnProperty('id')) {
        return this.vehicleService.get(+params['id'], this.userObject);
      }else {
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
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
