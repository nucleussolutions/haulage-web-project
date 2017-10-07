import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {Response} from "@angular/http";
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-persist.component.html'
})
export class ConsignmentPersistComponent implements OnInit {

  consignment = new Consignment();
  create = true;
  errors: any[];
  locationList: Location[];

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private locationService: LocationService, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {

    this.locationService.list(this.token, this.apiKey).subscribe((locationList: Location[]) => { this.locationList = locationList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.consignmentService.get(+params['id']).subscribe((consignment: Consignment) => {
          this.create = false;
          this.consignment = consignment;
        });
      }
    });
  }

  save() {
    this.consignmentService.save(this.consignment).subscribe((consignment: Consignment) => {
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
