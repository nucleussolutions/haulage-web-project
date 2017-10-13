import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import { NavDrawerService } from 'app/nav-drawer.service';


@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

  locationList: Location[] = [];

  constructor(private locationService: LocationService, private cookieService : CookieService, private modal : Modal, private router: Router, private navDrawerService : NavDrawerService) {
  }

  ngOnInit() {
    let token = this.cookieService.get('token');
    let apiKey = this.cookieService.get('apiKey');
    this.locationService.list(token, apiKey).subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    }, error => {
      let message;

      if(error.status === 401){
        message = 'Unauthorized';
      }else if(error.status === 500){
        message = "Internal server error";
      }else if(error.status === 400){
        message = 'Bad request';
      }

      const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

      dialog.then(value => {
        //todo trigger an event to reload the navdrawer component

      });
      
      this.navDrawerService.trigger(false);
      this.cookieService.removeAll();
      this.router.navigate(['/login']);
    });
  }
}
