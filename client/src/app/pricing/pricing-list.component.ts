import {Component, OnInit} from '@angular/core';
import {PricingService} from './pricing.service';
import {Pricing} from './pricing';

@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html'
})
export class PricingListComponent implements OnInit {

  pricingList: Pricing[] = [];

  constructor(private pricingService: PricingService) { }

  ngOnInit() {
    this.pricingService.list().subscribe((pricingList: Pricing[]) => {
      this.pricingList = pricingList;
    });
  }
}
