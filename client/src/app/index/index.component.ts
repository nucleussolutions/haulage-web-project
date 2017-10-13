import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HaulierInfoService } from "../haulierInfo/haulierInfo.service";
import { ForwarderInfoService } from "../forwarderInfo/forwarderInfo.service";
import { CreateProfileModalComponent } from "../create-profile-modal/create-profile-modal.component";
import { overlayConfigFactory } from "ngx-modialog";
import { CookieService } from "ngx-cookie";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [CookieService]
})
export class IndexComponent implements OnInit, AfterViewInit {

    bsModalRef: BsModalRef;

    private token: string;

    private permission: string;



    constructor(public modal: Modal, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private cookieService: CookieService) {
        this.token = this.cookieService.get('token');
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        //if it's a first time user, and the user is a haulier and forwarder, then show a modal prompting for profile creation

        setTimeout(() => {
            if (this.token) {
                this.modal
                    .open(CreateProfileModalComponent, overlayConfigFactory({
                        isBlocking: false,
                        size: 'lg'
                    }, BSModalContext));
            }
        });


        //todo get permission for the user
    }

    submitDetails(formData) {


        //determine whether it's a haullier or forwarder then submit details to the backend


    }
}