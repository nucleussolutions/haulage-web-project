import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

  locationList: Location[] = [];

  constructor(private locationService: LocationService, private cookieService : CookieService) { }

  ngOnInit() {
    let token = this.cookieService.get('token');
    let apiKey = this.cookieService.get('apiKey');
    this.locationService.list(token, apiKey).subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    });
  }
}
