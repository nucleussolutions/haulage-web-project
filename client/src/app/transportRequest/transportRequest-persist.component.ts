import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransportRequest} from './transportRequest';
import {TransportRequestService} from './transportRequest.service';
import {Response} from "@angular/http";
import {ConsignmentService} from '../consignment/consignment.service';
import {Consignment} from '../consignment/consignment';
import {CustomerService} from '../customer/customer.service';
import {Customer} from '../customer/customer';
import {LocationService} from '../location/location.service';
import {Location} from '../location/location';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {BSModalContext, Modal} from 'ngx-modialog/plugins/bootstrap';
import {ConsignmentPersistComponent} from "../consignment/consignment-persist.component";
import {overlayConfigFactory} from "ngx-modialog";
import {CreateConsignmentModalComponent} from "../create-consignment-modal/create-consignment-modal.component";


@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-persist.component.html',
  providers: [UserService]
})
export class TransportRequestPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transportRequest = new TransportRequest();
  create = true;
  errors: any[];
  locationList: Location[];
  consignmentList: Consignment[];

  private userObject: any;

  columns = [
    {prop: 'Container No.'},
    {name: 'Name'},
    {name: 'Size'},
    {name: 'Type'},
    {name: 'Accept Time'},
    {name: 'Task Type'},
  ];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private consignmentService: ConsignmentService, private customerService: CustomerService, private locationService: LocationService, private userService: UserService, private modal: Modal) {
    this.subscription = this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });
  }

  ngOnInit() {
    this.transportRequest.customer = new Customer();
    this.locationService.list(this.userObject).subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    });
    this.transportRequest.hazardous = false;
    this.transportRequest.overDimension = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.transportRequestService.get(+params['id'], this.userObject).subscribe((transportRequest: TransportRequest) => {
          this.create = false;
          this.transportRequest = transportRequest;

          this.consignmentList = this.transportRequest.consignments;
          console.log('transportRequest ' + JSON.stringify(this.transportRequest));
          //todo use this data to display consignments in the ui if it's for edit
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

  onAddConsignmentClick() {
    this.modal.open(CreateConsignmentModalComponent, overlayConfigFactory({
      isBlocking: false,
      size: 'md'
    }, BSModalContext));
  }

  addConsignment(consignment: Consignment) {
    //add into the list of consignments
    this.consignmentList.push(consignment);
  }

  deleteConsignment(id: number){
    this.consignmentList.pop();
  }

}
