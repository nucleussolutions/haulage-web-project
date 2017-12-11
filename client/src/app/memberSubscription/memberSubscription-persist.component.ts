import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MemberSubscription} from './memberSubscription';
import {MemberSubscriptionService} from './memberSubscription.service';
import { PricingService } from '../pricing/pricing.service';
import { Pricing } from '../pricing/pricing';
import {UserService} from '../user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'memberSubscription-persist',
  templateUrl: './memberSubscription-persist.component.html'
})
export class MemberSubscriptionPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  memberSubscription = new MemberSubscription();
  create = true;
  errors: any[];
  pricingList: Pricing[];

  private userObject: any;

  private subscription: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private router: Router, private pricingService: PricingService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.pricingService.list(userObject, 1);
    }).subscribe((pricingList: Pricing[]) => { this.pricingList = pricingList; });
    this.memberSubscription.monthlyRecurring = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.memberSubscriptionService.get(+params['id'], this.userObject).subscribe((memberSubscription: MemberSubscription) => {
          this.create = false;
          this.memberSubscription = memberSubscription;
        });
      }
    });
  }

  save() {
    this.memberSubscriptionService.save(this.memberSubscription, this.userObject).subscribe((memberSubscription: MemberSubscription) => {
      this.router.navigate(['/memberSubscription', 'show', memberSubscription.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        // this.errors = json._embedded.errors;
      }
    });
  }
}
