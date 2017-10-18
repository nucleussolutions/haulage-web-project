import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {Response} from "@angular/http";
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-persist.component.html',
  providers: [UserService]
})
export class ConsignmentPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  consignment = new Consignment();
  create = true;
  errors: any[];
  locationList: Location[];

  private subscription: Subscription;

  private userObject : any;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private locationService: LocationService, private userService: UserService) {

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });

  }

  ngOnInit() {

    this.locationService.list(this.userObject.token, this.userObject.apiKey).subscribe((locationList: Location[]) => { this.locationList = locationList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.consignmentService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((consignment: Consignment) => {
          this.create = false;
          this.consignment = consignment;
        });
      }
    });
  }

  save() {
    this.consignmentService.save(this.consignment, this.userObject.token, this.userObject.apiKey).subscribe((consignment: Consignment) => {
      this.router.navigate(['/consignment', 'show', consignment.id]);
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
