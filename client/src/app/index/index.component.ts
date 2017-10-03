import {Component, OnInit} from '@angular/core';
import {BSModalContext, Modal} from 'ngx-modialog/plugins/bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {CreateProfileModalComponent} from "../create-profile-modal/create-profile-modal.component";
import {overlayConfigFactory} from "ngx-modialog";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    bsModalRef: BsModalRef;

    constructor(public modal: Modal, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService) {
    }

    ngOnInit() {

        //if it's a first time user, and the user is a haulier and forwarder, then show a modal prompting for profile creation
        this.modal.open(CreateProfileModalComponent, overlayConfigFactory({}, BSModalContext));
    }


    submitDetails(formData) {


        //determine whether it's a haullier or forwarder then submit details to the backend


    }
}