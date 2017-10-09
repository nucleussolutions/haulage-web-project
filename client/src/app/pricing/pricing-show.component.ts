import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pricing} from './pricing';
import {PricingService} from './pricing.service';
import {CookieService} from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-show.component.html'
})
export class PricingShowComponent implements OnInit {

  pricing = new Pricing();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private cookieService : CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.pricingService.get(+params['id'], this.token, this.apiKey).subscribe((pricing: Pricing) => {
        this.pricing = pricing;
      });
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.pricingService.destroy(this.pricing, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/pricing','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
