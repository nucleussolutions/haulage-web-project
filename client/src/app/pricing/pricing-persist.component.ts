import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pricing} from './pricing';
import {PricingService} from './pricing.service';
import {Response} from "@angular/http";


@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-persist.component.html'
})
export class PricingPersistComponent implements OnInit {

  pricing = new Pricing();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.pricingService.get(+params['id']).subscribe((pricing: Pricing) => {
          this.create = false;
          this.pricing = pricing;
        });
      }
    });
  }

  save() {
    this.pricingService.save(this.pricing).subscribe((pricing: Pricing) => {
      this.router.navigate(['/pricing', 'show', pricing.id]);
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
