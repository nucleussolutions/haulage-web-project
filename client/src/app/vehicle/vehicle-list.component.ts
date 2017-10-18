import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from "@angular/platform-browser";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
  providers: [UserService]
})
export class VehicleListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  vehicleList: Vehicle[] = [];

  private subscription: Subscription;

  private userObject: any;

  constructor(private vehicleService: VehicleService, private userService: UserService, private modal: Modal, private titleService: Title) {

    this.titleService.setTitle('Vehicles');

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.vehicleService.list(this.userObject.token, this.userObject.apiKey).subscribe((vehicleList: Vehicle[]) => {
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

      const dialog = this.modal.alert().title('Error').message(message).open();

    });
  }
}
