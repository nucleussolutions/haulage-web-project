import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pricing} from './pricing';
import {PricingService} from './pricing.service';

@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-show.component.html'
})
export class PricingShowComponent implements OnInit {

  pricing = new Pricing();

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.pricingService.get(+params['id']).subscribe((pricing: Pricing) => {
        this.pricing = pricing;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.pricingService.destroy(this.pricing).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/pricing','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
