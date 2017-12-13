import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

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

  private page: number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  private count: number = 0;

  private Math: any;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {
      this.userObject = result[0];
      //if params doesnt exist, let api call, if there is, then proceed to call the api by page number
      let params = result[1];
      console.log('params '+JSON.stringify(params));
      if (params['page']) {
        this.page = params['page'];
      }

      this.locationService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.locationService.list(this.userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(locationDatum => {
        let location = new Location(locationDatum.attributes);
        location.id = locationDatum.id;
        this.locationList.push(location);
      });
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
