import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemberSubscriptionService } from './memberSubscription.service';
import { MemberSubscription } from './memberSubscription';
import { UserService } from "../user.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";

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

  private subscription: Subscription;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private userService: UserService) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      this.memberSubscriptionService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.memberSubscriptionService.list(this.userObject, this.offset);
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

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.memberSubscriptionService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<MemberSubscription[]>([]))
        .subscribe(memberSubscriptionList => {
          this.memberSubscriptionList = memberSubscriptionList;
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<MemberSubscription[]>([]);
        });
    }
  }
}
