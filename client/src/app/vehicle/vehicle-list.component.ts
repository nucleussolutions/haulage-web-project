import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from "@angular/platform-browser";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  vehicleList: Vehicle[] = [];

  private subscription: Subscription;

  private page : number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private userService: UserService, private modal: Modal, private titleService: Title) {

    this.titleService.setTitle('Vehicles');
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.vehicleService.list(userObject, this.page);
    }).subscribe(json => {
      // this.vehicleList = vehicleList;
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(vehicleDatum => {
        let vehicle = new Vehicle(vehicleDatum.attributes);
        vehicle.id = vehicleDatum.id;
        this.vehicleList.push(vehicle);
      });

    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      console.log('error.status '+error.status);

      const dialog = this.modal.alert().title('Error').message(message).open();

    });
  }
}
