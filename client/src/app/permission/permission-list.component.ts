import {Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from './permission.service';
import {Permission} from './permission';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'app/user.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  permissionList: Permission[] = [];

  private subscription: Subscription;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      let offset = (this.page - 1) * this.limit;


      this.permissionService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.permissionService.list(userObject, offset);
    }).subscribe((permissionList: Permission[]) => {
      this.permissionList = permissionList;
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

  onPageChange(offset) {
    console.log('onPageChange offset '+offset);
    this.offset = offset;
    this.router.navigate(['/permission', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }
}
