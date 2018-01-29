import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransportRequest } from './transportRequest';
import { TransportRequestService } from './transportRequest.service';
import { ConsignmentService } from '../consignment/consignment.service';
import { Consignment } from '../consignment/consignment';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location';
import { UserService } from "../user.service";
import { Subscription } from "rxjs/Subscription";
import { CreateConsignmentModalComponent } from "../create-consignment-modal/create-consignment-modal.component";
import { PermissionService } from "../permission/permission.service";
import { Permission } from "../permission/permission";
import { CreateConsignmentEventService } from "../create-consignment-event.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import { LoadingComponent } from "../loading/loading.component";
import {S3Service} from "../service/s3.service";
import { HaulierInfoService } from 'app/haulierInfo/haulierInfo.service';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-persist.component.html',
  providers: [CreateConsignmentEventService]
})
export class TransportRequestPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  transportRequest = new TransportRequest();
  create = true;
  errors: any[];
  locationList: Location[];

  consignmentList: Consignment[];

  private userObject: any;

  private subscription: Subscription;

  private permission: Permission;

  selectedConsignment = [];

  cmoImg: File;

  bookingConfirmationImg: File;

  kOnekEightFormImg: File;

  gatePassImg: File;

  private formGroup: FormGroup;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private consignmentService: ConsignmentService, private customerService: CustomerService, private locationService: LocationService, private userService: UserService, private permissionService: PermissionService, private createConsignmentEventService: CreateConsignmentEventService, private haulierInfoService: HaulierInfoService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    //validation for fields including dates
    this.formGroup = formBuilder.group({
      type: ['', Validators.compose([Validators.required])],
      equipment: ['', Validators.compose([Validators.required])],
      terminal: ['', Validators.compose([Validators.required])],
      vesselName: ['', Validators.compose([Validators.required])],
      voyageNo: ['', Validators.compose([Validators.required])],
      vesselEtaOrEtd: ['', Validators.compose([Validators.required])],
      portOfLoading: ['', Validators.compose([Validators.required])],
      portOfDischarge: ['', Validators.compose([Validators.required])],
      pickupOrDropoffEmptyDepoh: ['', Validators.compose([Validators.required])],
      shippingAgent: ['', Validators.compose([Validators.required])],
      forwardingAgent: ['', Validators.compose([Validators.required])],
      operatorCode: ['', Validators.compose([Validators.required])],
      grossWeight: ['', Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
    this.consignmentList = [];
    this.transportRequest.customer = new Customer();
    this.transportRequest.customer.country = 'Malaysia';
    this.transportRequest.hazardous = false;
    this.transportRequest.overDimension = false;
    this.transportRequest.status = 'pending';

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).subscribe(response => {
      this.userObject = response[0];
      let params = response[1];

      this.permissionService.getByUserId(this.userObject).subscribe(permission => {
        this.permission = permission;

        if(this.permission.authority == 'Manager' && this.transportRequest.forwarderId === null){
          //check permissions before setting this
          this.transportRequest.forwarderId = this.userObject.uid;
        }

      }, error => {
        console.log('transportrequest persist permission error '+error);
      });

      //todo this is supposed to be api for location by something
      this.locationService.list(this.userObject, 0).subscribe(json => {
        let data = json['data'];
        let links = json['links'];
        // this.nextLink = links.next;
        // this.firstLink = links.first;
        // this.lastLink = links.last;

        this.locationList = [];

        data.forEach(locationDatum => {
          let location = new Location(locationDatum.attributes);
          location.id = locationDatum.id;
          this.locationList.push(location);
        });
        console.log('locationList ' + JSON.stringify(this.locationList));
      });


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
        });
      }

    });
  }

  save() {



    // let loadingDialogRef = this.modal.open(LoadingComponent, overlayConfigFactory({
    //   isBlocking: false,
    //   size: 'md',
    //   message: 'Saving RFT...'
    // }, BSModalContext));

    // loadingDialogRef.result.then(result => {
    //
    //   Observable.of(this.kOnekEightFormImg).flatMap(kOnekEightFormImg => {
    //     if(kOnekEightFormImg){
    //       return this.readFile(kOnekEightFormImg);
    //     }
    //   }).subscribe(base64Observable => {
    //     this.transportRequest.konekEightBase64String = base64Observable.result;
    //   });
    //
    //   Observable.of(this.bookingConfirmationImg).flatMap(bookingConfirmationImg => {
    //     if(bookingConfirmationImg){
    //       return this.readFile(bookingConfirmationImg);
    //     }
    //   }).subscribe(base64Observable => {
    //     this.transportRequest.bookingConfirmationBase64String = base64Observable.result;
    //   });
    //
    //   Observable.of(this.cmoImg).flatMap(cmoImg => {
    //     if(cmoImg){
    //       return this.readFile(cmoImg)
    //     }
    //   }).subscribe(base64Observable => {
    //     this.transportRequest.cmoBase64String = base64Observable.result;
    //   });
    //
    //   Observable.of(this.gatePassImg).flatMap(gatePassImg => {
    //     if(this.gatePassImg){
    //       return this.readFile(gatePassImg);
    //     }
    //   }).subscribe(base64Observable => {
    //     this.transportRequest.gatePassBase64String = base64Observable.result;
    //   });
    //
    //   console.log('transportRequest being sent to the server '+this.transportRequest);
    //
    //   this.transportRequestService.save(this.transportRequest, this.userObject).subscribe((transportRequest: TransportRequest) => {
    //     this.router.navigate(['/transportRequest', 'show', transportRequest.id]);
    //   }, (json: Response) => {
    //     if (json.hasOwnProperty('message')) {
    //       this.errors = [json];
    //     } else {
    //       // this.errors = json;
    //     }
    //   });
    // });
  }

  readFile(fileToRead: File): Observable<MSBaseReader>{
    let base64Observable = new ReplaySubject<MSBaseReader>(1);

    let fileReader = new FileReader();
    fileReader.onload = event => {
      base64Observable.next(fileReader.result);
    };
    fileReader.readAsDataURL(fileToRead);

    return base64Observable;
  }

  onAddConsignmentClick() {
    const modalRef = this.modalService.open(CreateConsignmentModalComponent);
    modalRef.componentInstance.name = 'Create or Edit Consignment';

    // const dialogRef = this.modal.open(CreateConsignmentModalComponent, overlayConfigFactory({
    //   isBlocking: false,
    //   size: 'md'
    // }, BSModalContext));
    //
    // dialogRef.result.then(consignment => {
    //   console.log('result ' + consignment);
    //   //this adds another consignment into the list of consignments
    //   this.consignmentList.push(consignment);
    // }, error => {
    //   // console.log('error '+error);
    // });
  }

  onDeleteConsignmentClick() {
    // const delDialogRef = this.modal.alert().title("Confirm Delete").message("Are you sure?").okBtn(null).okBtnClass('hidden')
    //   .addButton('btn btn-primary', 'Accept', function (dialogFooter) {
    //     console.log('ok callback');
    //     dialogFooter.dialog.dismiss();
    //     //todo delete selected consignment from the list of consignments
    //     if (this.selectedConsignment) {
    //       // this.consignmentService.destroy(this.selectedConsignment[0], this.userObject).subscribe(response => {
    //       //   console.log('delete successful');
    //       // });
    //
    //       //todo refresh the persist page again perhaps?
    //       this.consignmentList.forEach((value, index) => {
    //         console.log('value ' + value + ' index ' + index);
    //         if (value == new Consignment(this.selectedConsignment[0])) {
    //           this.consignmentList.splice(index, 1);
    //         }
    //       });
    //
    //       console.log('consignmentList count ' + this.consignmentList.length);
    //     }
    //     return false;
    //   })
    //   .addButton('btn btn-primary', 'Cancel', function (dialogFooter) {
    //     dialogFooter.dialog.dismiss();
    //     return false;
    //   })
    //   .open();
    // delDialogRef.result.then(result => {
    //
    // });
  }

  onEditConsignmentClick(consignment: Consignment) {
    const modalRef = this.modalService.open(CreateConsignmentModalComponent);
    modalRef.componentInstance.consignment = consignment;
    // this.modal.open(CustomModal, overlayConfigFactory({ num1: 2, num2: 3 }, BSModalContext));
    // const dialogRef = this.modal.open(CreateConsignmentModalComponent, overlayConfigFactory({
    //   isBlocking: false,
    //   size: 'md',
    //   consignment: new Consignment(this.selectedConsignment[0])
    // }, BSModalContext));
    //
    // dialogRef.result.then(consignment => {
    //   console.log('result ' + consignment);
    //   //this adds another consignment into the list of consignments
    //   this.consignmentList.push(consignment);
    // }, error => {
    //   // console.log('error '+error);
    // });
  }


  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedConsignment);
  }
}