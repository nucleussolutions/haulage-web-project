import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from './location';
import {LocationService} from './location.service';
import {Response} from "@angular/http";


@Component({
  selector: 'location-persist',
  templateUrl: './location-persist.component.html'
})
export class LocationPersistComponent implements OnInit {

  location = new Location();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.locationService.get(+params['id']).subscribe((location: Location) => {
          this.create = false;
          this.location = location;
        });
      }
    });
  }

  save() {
    this.locationService.save(this.location).subscribe((location: Location) => {
      this.router.navigate(['/location', 'show', location.id]);
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
