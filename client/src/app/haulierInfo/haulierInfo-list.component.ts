import {Component, OnDestroy, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html',
})
export class HaulierInfoListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  haulierInfoList: HaulierInfo[] = [];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService, private permissionService: PermissionService) {
    this.titleService.setTitle('Hauliers');
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];


      return this.haulierInfoService.list(userObject);
    }).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    }, error => {
      let message;
      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }
      const dialog = this.modal.alert().title('Error').message(message).open();
      dialog.result.then(result => {
        //todo might need to navigate them back to login
        this.router.navigate(['/login']);
      });
    });
  }

}
