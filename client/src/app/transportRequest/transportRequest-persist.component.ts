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
import {overlayConfigFactory} from "ngx-modialog";
import {CreateConsignmentModalComponent} from "../create-consignment-modal/create-consignment-modal.component";
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";
import {CreateConsignmentEventService} from "../create-consignment-event.service";


@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-persist.component.html',
  providers: [CreateConsignmentEventService]
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

  private subscription: Subscription;

  private permission: Permission;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private consignmentService: ConsignmentService, private customerService: CustomerService, private locationService: LocationService, private userService: UserService, private modal: Modal, private permissionService: PermissionService, private createConsignmentEventService: CreateConsignmentEventService) {
    this.subscription = this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });

  }

  ngOnInit() {
    this.consignmentList = [];

    //fixme simplify this mess

    this.permissionService.getByUserId(this.userObject).subscribe(permission => {
      this.permission = permission;
    });

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

          console.log('consignmentList ' + JSON.stringify(this.consignmentList));
          this.consignmentList.forEach(value => {
            console.log(value.name);
          });
          console.log('transportRequest ' + JSON.stringify(this.transportRequest));
          //todo use this data to display consignments in the ui if it's for edit
        });
      }
    });
  }

  save() {
    this.transportRequestService.save(this.transportRequest, this.userObject).subscribe((transportRequest: TransportRequest) => {
      this.router.navigate(['/transportRequest', 'show', transportRequest.id]);
    }, (json: Response) => {
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        // this.errors = json;
      }
    });
  }

  onAddConsignmentClick() {
    const dialogRef = this.modal.open(CreateConsignmentModalComponent, overlayConfigFactory({
      isBlocking: false,
      size: 'md'
    }, BSModalContext)).then(dialogRef => {
      console.log('dialogRef ' + dialogRef);

      dialogRef.result.then(consignment => {
        console.log('result ' + consignment);
        //this adds another consignment into the list of consignments
        this.consignmentList.push(consignment);
      }, error => {
        // console.log('error '+error);
      });

    }, error => {
      console.log('reject ' + error);
    });
  }

  onDeleteConsignmentClick() {
    const delDialogRef = this.modal.alert().title("Confirm Delete").message("Are you sure?").open();


    delDialogRef.then(dialogRef => {
      dialogRef.result.then()
    });
  }

  onEditConsignmentClick(consignment: Consignment) {
    // this.modal.open(CustomModal, overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    const dialogRef = this.modal.open(CreateConsignmentModalComponent, overlayConfigFactory({
      isBlocking: false,
      size: 'md',
      consignment: new Consignment(this.selectedConsignment[0])
    }, BSModalContext)).then(dialogRef => {
      console.log('dialogRef ' + dialogRef);

      dialogRef.result.then(consignment => {
        console.log('result ' + consignment);
        //this adds another consignment into the list of consignments
        this.consignmentList.push(consignment);
      }, error => {
        // console.log('error '+error);
      });

    }, error => {
      console.log('reject ' + error);
    });
  }

  selectedConsignment = [];

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedConsignment);
  }
}