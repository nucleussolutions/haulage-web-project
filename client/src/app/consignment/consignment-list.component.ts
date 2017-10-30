import {Component, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';

@Component({
    selector: 'consignment-list',
    templateUrl: './consignment-list.component.html',
    providers: [UserService]
})
export class ConsignmentListComponent implements OnInit {

    consignmentList: Consignment[] = [];
    private userObject : any;


    constructor(private consignmentService: ConsignmentService, private modal: Modal, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getUser().subscribe(response => {
            this.userObject = response;
            this.consignmentService.list(this.userObject.token, this.userObject.apiKey).subscribe((consignmentList: Consignment[]) => {
                this.consignmentList = consignmentList;
            });
        });

    }
}
