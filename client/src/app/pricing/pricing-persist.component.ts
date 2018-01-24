import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pricing } from './pricing';
import { PricingService } from './pricing.service';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-persist.component.html',
})
export class PricingPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pricing = new Pricing();
  create = true;
  errors: any[];

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.pricingService.get(+params['id'], this.userObject);
      }else{
        throw 'Error occurred, id param not found'
      }
    }).subscribe((pricing: Pricing) => {
      this.create = false;
      this.pricing = pricing;
    }, error => {
      // this.modal.alert()
      //   .title('Error')
      //   .message(error).open();
    });
  }

  save() {
    this.pricingService.save(this.pricing, this.userObject).subscribe((pricing: Pricing) => {
      this.router.navigate(['/pricing', 'show', pricing.id]);
    }, (res => {
      if (res.hasOwnProperty('message')) {
        this.errors = [res];
      } else {
        this.errors = res._embedded.errors;
      }
    }));
  }
}
