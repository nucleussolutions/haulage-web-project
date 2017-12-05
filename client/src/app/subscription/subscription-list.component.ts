import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionService} from './subscription.service';
import {Subscription} from './subscription';
import {PermissionService} from "../permission/permission.service";
import {UserService} from "../user.service";

@Component({
  selector: 'subscription-list',
  templateUrl: './subscription-list.component.html'
})
export class SubscriptionListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {

  }

  subscriptionList: Subscription[] = [];

  private userObject: any;

  constructor(private subscriptionService: SubscriptionService, private userService: UserService, private permissionService: PermissionService) { }

  ngOnInit() {

    this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.permissionService.getByUserId(userObject);
    }).subscribe(permission => {

      if(permission.authority !== 'User'){
        this.subscriptionService.list(this.userObject).subscribe((subscriptionList: Subscription[]) => {
          this.subscriptionList = subscriptionList;
        });
      }

    });


  }
}
