import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MemberSubscription} from './memberSubscription';
import {MemberSubscriptionService} from './memberSubscription.service';
import { UserService } from 'app/user.service';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'memberSubscription-persist',
  templateUrl: './memberSubscription-show.component.html'
})
export class MemberSubscriptionShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  memberSubscription = new MemberSubscription();

  private userObject: any;

  private subscription: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private router: Router, private userService: UserService) {}

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      const params = result[1];

      return this.memberSubscriptionService.get(+params['id'], this.userObject);
    }).subscribe((memberSubscription: MemberSubscription) => {
        this.memberSubscription = memberSubscription;
      });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.memberSubscriptionService.destroy(this.memberSubscription, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/memberSubscription', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
