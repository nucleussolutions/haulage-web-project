import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BSModalContext, Modal} from 'ngx-modialog/plugins/bootstrap';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {CreateProfileModalComponent} from "../create-profile-modal/create-profile-modal.component";
import {overlayConfigFactory} from "ngx-modialog";
import {NavDrawerComponent} from 'app/nav-drawer/nav-drawer.component';
import {Title} from "@angular/platform-browser";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [UserService],
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    bsModalRef: BsModalRef;

    @ViewChild(NavDrawerComponent)
    navDrawerComponent: NavDrawerComponent;

    private userObject: any;

    private subscription: Subscription;

    private permission: Permission;

    constructor(public modal: Modal, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private titleService: Title, private userService: UserService, private permissionService: PermissionService) {

        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });

        this.titleService.setTitle('Dashboard');
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.permissionService.getByUserId(this.userObject.uid, this.userObject.token, this.userObject.apiKey).subscribe(permission => {
            this.permission = permission;

            if(this.permission.authority !== 'Super Admin'){
                //todo check if user exists in hauliers and forwarders table
                this.userService.checkUserType(this.userObject.uid, this.userObject.token, this.userObject.apiKey).then(response => {

                }, error => {
                    if(error.status === 422){
                        setTimeout(() => {
                            if (this.userObject.token) {
                                this.modal
                                    .open(CreateProfileModalComponent, overlayConfigFactory({
                                        isBlocking: false,
                                        size: 'lg'
                                    }, BSModalContext));
                            }
                        });
                    }else{
                        this.modal.alert().title('Error').message(error.message).open();
                    }

                });

            }
        }, error => {
            if(error.status == 400){
                setTimeout(() => {
                    if (this.userObject.token) {
                        this.modal
                            .open(CreateProfileModalComponent, overlayConfigFactory({
                                isBlocking: false,
                                size: 'lg'
                            }, BSModalContext));
                    }
                });
            }
            console.log('NavDrawerComponent permissionService error '+error);
        });


    }
}
