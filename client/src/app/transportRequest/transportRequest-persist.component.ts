import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransportRequest} from './transportRequest';
import {TransportRequestService} from './transportRequest.service';
import {Response} from "@angular/http";
import { ConsignmentService } from '../consignment/consignment.service';
import { Consignment } from '../consignment/consignment';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import {UserService} from "../user.service";

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-persist.component.html',
  providers: [UserService]
})
export class TransportRequestPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
  }

  transportRequest = new TransportRequest();
  create = true;
  errors: any[];
  locationList: Location[];
  consignmentList: Consignment[];
  customerList: Customer[];

  private userObject:any;

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private consignmentService: ConsignmentService, private customerService: CustomerService, private locationService: LocationService, private userService: UserService) {
    this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    })
  }

  ngOnInit() {
    this.transportRequest.customer = new Customer();
    this.locationService.list(this.userObject).subscribe((locationList: Location[]) => { this.locationList = locationList; });
    this.transportRequest.hazardous = false;
    this.transportRequest.overDimension = false;
    this.consignmentService.list(this.userObject).subscribe((consignmentList: Consignment[]) => { this.consignmentList = consignmentList; });
    this.customerService.list(this.userObject).subscribe((customerList: Customer[]) => { this.customerList = customerList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.transportRequestService.get(+params['id'], this.userObject).subscribe((transportRequest: TransportRequest) => {
          this.create = false;
          this.transportRequest = transportRequest;
        });
      }
    });
  }

  save() {
    this.transportRequestService.save(this.transportRequest, this.userObject).subscribe((transportRequest: TransportRequest) => {
      this.router.navigate(['/transportRequest', 'show', transportRequest.id]);
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
