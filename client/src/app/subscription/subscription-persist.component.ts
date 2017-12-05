import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from './subscription';
import {SubscriptionService} from './subscription.service';
import {Response} from "@angular/http";
import { PricingService } from '../pricing/pricing.service';
import { Pricing } from '../pricing/pricing';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'subscription-persist',
  templateUrl: './subscription-persist.component.html'
})
export class SubscriptionPersistComponent implements OnInit {

  subscription = new Subscription();
  create = true;
  errors: any[];
  pricingList: Pricing[];

  private userObject: any;

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, private router: Router, private pricingService: PricingService, private userService: UserService) {}

  ngOnInit() {
    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      this.pricingService.list(this.userObject).subscribe((pricingList: Pricing[]) => { this.pricingList = pricingList; });
      this.subscription.monthlyRecurring = false;

      return this.subscriptionService.get(+params['id'], this.userObject);
    }).subscribe((subscription: Subscription) => {
      this.create = false;
      this.subscription = subscription;
    });
  }

  save() {
    this.subscriptionService.save(this.subscription, this.userObject).subscribe((subscription: Subscription) => {
      this.router.navigate(['/subscription', 'show', subscription.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
