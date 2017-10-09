import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

  locationList: Location[] = [];

  constructor(private locationService: LocationService, private cookieService : CookieService, private modal : Modal) {
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
      }else {
        message = "Internal server error";
      }

      this.modal.alert().title('Error').message(message).open();
    });
  }
}
