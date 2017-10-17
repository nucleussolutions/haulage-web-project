import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HaulierInfoService } from "../haulierInfo/haulierInfo.service";
import { ForwarderInfoService } from "../forwarderInfo/forwarderInfo.service";
import { CreateProfileModalComponent } from "../create-profile-modal/create-profile-modal.component";
import { overlayConfigFactory } from "ngx-modialog";
import { CookieService } from "ngx-cookie";
import { NavDrawerComponent } from 'app/nav-drawer/nav-drawer.component';
import {Title} from "@angular/platform-browser";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [CookieService],
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    bsModalRef: BsModalRef;

    private permission: string;

    @ViewChild(NavDrawerComponent)
    navDrawerComponent: NavDrawerComponent;

    private userObject: any;

    private subscription: Subscription;

    constructor(public modal: Modal, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private titleService: Title, private userService: UserService) {

        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        })

        this.titleService.setTitle('Dashboard');
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        //if it's a first time user, and the user is a haulier and forwarder, then show a modal prompting for profile creation

        setTimeout(() => {
            if (this.userObject.token) {
                this.modal
                    .open(CreateProfileModalComponent, overlayConfigFactory({
                        isBlocking: false,
                        size: 'lg'
                    }, BSModalContext));
            }
        });


        //todo get permission for the user
    }
}
