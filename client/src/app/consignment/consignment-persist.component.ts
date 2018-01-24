import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {Response} from "@angular/http";
import {LocationService} from '../location/location.service';
import {Location} from '../location/location';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

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
  locationList: Location[];

  private subscription: Subscription;
  private userObject: any;


  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private locationService: LocationService, private userService: UserService, private permissionService: PermissionService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
      this.checkPermissions();
    });
  }

  ngOnInit() {
  }

  private checkPermissions() {
    this.permissionService.getByUserId(this.userObject).subscribe(permission => {
      if (permission.authority == 'Super Admin' || permission.authority == 'Admin') {

        //todo this is not supposed to be done like this
        // this.locationService.list(this.userObject, 1).subscribe((locationList: Location[]) => {
        //   this.locationList = locationList;
        // });
        this.route.params.subscribe((params: Params) => {
          if (params.hasOwnProperty('id')) {
            this.consignmentService.get(+params['id'], this.userObject).subscribe((consignment: Consignment) => {
              this.create = false;
              this.consignment = consignment;
            });
          }
        });
      } else {
        // const dialog = this.modal.alert().title('Error').message('Unauthorized').open();
        // dialog.result.then(result => {
        //   this.router.navigate(['/index']);
        // });
      }
    });
  }

  save() {
    this.consignmentService.save(this.consignment, this.userObject).subscribe((consignment: Consignment) => {
      this.router.navigate(['/consignment', 'show', consignment.id]);
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
