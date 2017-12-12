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

  private page: number = 0;

  private subscription : Subscription;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  private count: number = 0;

  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private userService: UserService) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.memberSubscriptionService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.memberSubscriptionService.list(userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(memberSubscriptionDatum => {
        let memberSubscription = new MemberSubscription(memberSubscriptionDatum.attributes);
        memberSubscription.id = memberSubscriptionDatum.id;
        this.memberSubscriptionList.push(memberSubscription);
      });

    });
  }
}
