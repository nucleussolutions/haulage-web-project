import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForwarderInfoService } from './forwarderInfo.service';
import { ForwarderInfo } from './forwarderInfo';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserInfoService} from "../userInfo/userInfo.service";
import {UserInfo} from "../userInfo/userInfo";


@Component({
  selector: 'forwarderInfo-list',
  templateUrl: './forwarderInfo-list.component.html',
})
export class ForwarderInfoListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  forwarderInfoList: UserInfo[] = [];

  private subscription: Subscription;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  permissions: Permission[];

  adminPermission: Permission;

  superAdminPermission: Permission;

  constructor(private route: ActivatedRoute, private titleService: Title, private userService: UserService, private userInfoService: UserInfoService, private router: Router, private permissionService: PermissionService, private modalService: NgbModal) {
    this.titleService.setTitle('Forwarders');

  }

  ngOnInit() {
    this.callForwarders();
  }

  callForwarders(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.userInfoService.countForwarders(this.userObject).subscribe(count => {
        this.count = count;
      });

      this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
        this.permissions = permissions;
        this.adminPermission = this.permissions.find(permission => permission.authority == 'Admin');
        this.superAdminPermission = this.permissions.find(permission => permission.authority == 'Super Admin');
      });

      return this.userInfoService.listForwarders(this.userObject, this.offset);
    }).subscribe(json => {
      if(json){
        let data = json['data'];

        this.forwarderInfoList = [];

        if(data){
          data.forEach(forwarderInfoDatum => {
            let forwarderInfo = new UserInfo(forwarderInfoDatum.attributes);
            forwarderInfo.id = forwarderInfoDatum.id;
            this.forwarderInfoList.push(forwarderInfo);
          });
        }
      }

    }, error => {
      let message;
      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }
      // this.modal.alert().title('Error').message(message).open();
      const errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = message;
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/forwarderInfo', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.userInfoService.searchForwarders(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<UserInfo[]>([]))
        .subscribe(json => {
          this.forwarderInfoList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          console.log(`Error in component ... ${error}`);
          return Observable.of<UserInfo[]>([]);
        });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callForwarders();
      });
    }
  }
}
