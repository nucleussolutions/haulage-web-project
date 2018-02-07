import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {LocationService} from '../location/location.service';
import {Location} from '../location/location';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-persist.component.html',
})
export class ConsignmentPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  consignment = new Consignment();
  create = true;
  errors: any[];
  // locationList: Location[];

  private subscription: Subscription;
  private userObject: any;

  private permissions: Permission[];

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private locationService: LocationService, private userService: UserService, private permissionService: PermissionService) {

  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.consignmentService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found, nothing to see here'
      }
    }).subscribe((consignment: Consignment) => {
      this.create = false;
      this.consignment = consignment;
    });

    this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
      this.permissions = permissions;
    });
  }


  save() {
    this.consignmentService.save(this.consignment, this.userObject).subscribe((consignment: Consignment) => {
      this.router.navigate(['/consignment', 'show', consignment.id]);
    }, (json) => {
      console.log('json error '+JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors '+JSON.stringify(this.errors));
    });
  }
}
