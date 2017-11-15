import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from './location';
import { LocationService } from './location.service';
import { Response } from "@angular/http";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
  selector: 'location-persist',
  templateUrl: './location-persist.component.html',
})
export class LocationPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  location = new Location();
  create = true;
  errors: any[];

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.locationService.get(+params['id'], this.userObject).subscribe((location: Location) => {
          this.create = false;
          this.location = location;
        });
      }
    });
  }

  save() {
    this.locationService.save(this.location, this.userObject).subscribe((location: Location) => {
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
