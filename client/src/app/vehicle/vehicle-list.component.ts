import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from "@angular/platform-browser";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private vehicleService: VehicleService, private userService: UserService, private modal: Modal, private titleService: Title) {

    this.titleService.setTitle('Vehicles');


  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => this.vehicleService.list(userObject)).subscribe((vehicleList: Vehicle[]) => {
      this.vehicleList = vehicleList;
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
