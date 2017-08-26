import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from './location';
import {LocationService} from './location.service';

@Component({
  selector: 'location-persist',
  templateUrl: './location-show.component.html'
})
export class LocationShowComponent implements OnInit {

  location = new Location();

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.locationService.get(+params['id']).subscribe((location: Location) => {
        this.location = location;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.locationService.destroy(this.location).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/location','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
