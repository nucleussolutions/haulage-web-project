import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberSubscriptionService} from './memberSubscription.service';
import {MemberSubscription} from './memberSubscription';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'memberSubscription-list',
  templateUrl: './memberSubscription-list.component.html'
})
export class MemberSubscriptionListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  memberSubscriptionList: MemberSubscription[] = [];

  private page: number = 1;

  private subscription : Subscription;

  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private userService: UserService) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.memberSubscriptionService.list(userObject, this.page);
    }).subscribe((memberSubscriptionList: MemberSubscription[]) => {
      this.memberSubscriptionList = memberSubscriptionList;
    });
  }
}
