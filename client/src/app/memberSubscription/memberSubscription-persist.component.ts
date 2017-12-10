import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MemberSubscription} from './memberSubscription';
import {MemberSubscriptionService} from './memberSubscription.service';
import {Response} from "@angular/http";
import { PricingService } from '../pricing/pricing.service';
import { Pricing } from '../pricing/pricing';

@Component({
  selector: 'memberSubscription-persist',
  templateUrl: './memberSubscription-persist.component.html'
})
export class MemberSubscriptionPersistComponent implements OnInit {

  memberSubscription = new MemberSubscription();
  create = true;
  errors: any[];
  pricingList: Pricing[];

  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private router: Router, private pricingService: PricingService) {}

  ngOnInit() {
    this.pricingService.list().subscribe((pricingList: Pricing[]) => { this.pricingList = pricingList; });
    this.memberSubscription.monthlyRecurring = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.memberSubscriptionService.get(+params['id']).subscribe((memberSubscription: MemberSubscription) => {
          this.create = false;
          this.memberSubscription = memberSubscription;
        });
      }
    });
  }

  save() {
    this.memberSubscriptionService.save(this.memberSubscription).subscribe((memberSubscription: MemberSubscription) => {
      this.router.navigate(['/memberSubscription', 'show', memberSubscription.id]);
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
