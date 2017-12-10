import {Component, OnInit} from '@angular/core';
import {MemberSubscriptionService} from './memberSubscription.service';
import {MemberSubscription} from './memberSubscription';

@Component({
  selector: 'memberSubscription-list',
  templateUrl: './memberSubscription-list.component.html'
})
export class MemberSubscriptionListComponent implements OnInit {

  memberSubscriptionList: MemberSubscription[] = [];

  constructor(private memberSubscriptionService: MemberSubscriptionService) { }

  ngOnInit() {
    this.memberSubscriptionService.list().subscribe((memberSubscriptionList: MemberSubscription[]) => {
      this.memberSubscriptionList = memberSubscriptionList;
    });
  }
}
