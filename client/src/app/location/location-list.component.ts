import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
})
export class LocationListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  locationList: Location[] = [];

  private subscription: Subscription;

  private userObject: any;

  constructor(private locationService: LocationService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.permissionService.getByUserId(userObject);
    }).subscribe(permission => {
      if (permission.authority == 'Super Admin' || permission.authority == 'Admin') {
        this.callLocationlistApi(1);
      } else {
        const dialog = this.modal.prompt().title('Error').message('Unauthorized').open();
        dialog.result.then(result => {
          this.router.navigate(['/index']);
        })
      }
    });
  }

  callLocationlistApi(page: number){
    this.locationService.list(this.userObject, page).subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = "Internal server error";
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

      dialog.result.then(result => {
        this.router.navigate(['/login']);
      });
    });
  }
}
