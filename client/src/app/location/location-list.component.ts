import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

  locationList: Location[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.list().subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    });
  }
}
