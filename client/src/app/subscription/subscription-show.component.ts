import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from './subscription';
import {SubscriptionService} from './subscription.service';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'subscription-persist',
  templateUrl: './subscription-show.component.html'
})
export class SubscriptionShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
  }

  subscription = new Subscription();

  private userObject: any;

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.subscriptionService.get(+params['id'], this.userObject);
    }).subscribe((subscription: Subscription) => {
      this.subscription = subscription;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.subscriptionService.destroy(this.subscription, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/subscription','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
