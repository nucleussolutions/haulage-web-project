import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransportRequest} from './transportRequest';
import {TransportRequestService} from './transportRequest.service';
import {Response} from "@angular/http";
import {LocationService} from '../location/location.service';
import {Location} from '../location/location';
import {ConsignmentService} from '../consignment/consignment.service';
import {Consignment} from '../consignment/consignment';
import {CustomerService} from '../customer/customer.service';
import {Customer} from '../customer/customer';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'transportRequest-persist',
    templateUrl: './transportRequest-persist.component.html',
    providers: [UserService]
})
export class TransportRequestPersistComponent implements OnInit {

    transportRequest = new TransportRequest();
    create = true;
    errors: any[];
    locationList: Location[];
    consignmentList: Consignment[];
    customerList: Customer[];

    settings: any;

    private subscription : Subscription;

    private userObject : any;

    constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private locationService: LocationService, private consignmentService: ConsignmentService, private customerService: CustomerService, private userService: UserService) {

        this.settings = {
            columns: {
                id: {
                    title: 'ID'
                },
                name: {
                    title: 'Full Name'
                },
                username: {
                    title: 'User Name'
                },
                email: {
                    title: 'Email'
                }
            }
        };

        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });
    }

    ngOnInit() {
        this.locationService.list(this.userObject).subscribe((locationList: Location[]) => {
            this.locationList = locationList;
        });
        this.transportRequest.hazardous = false;
        this.transportRequest.overDimension = false;
        this.consignmentService.list(this.userObject).subscribe((consignmentList: Consignment[]) => {
            this.consignmentList = consignmentList;
        });
        this.customerService.list(this.userObject).subscribe((customerList: Customer[]) => {
            this.customerList = customerList;
        });
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.transportRequestService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((transportRequest: TransportRequest) => {
                    this.create = false;
                    this.transportRequest = transportRequest;
                });
            }
        });
    }

    save() {
        this.transportRequestService.save(this.transportRequest, this.userObject.token, this.userObject.apiKey).subscribe((transportRequest: TransportRequest) => {
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
