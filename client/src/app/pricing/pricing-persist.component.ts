import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pricing} from './pricing';
import {PricingService} from './pricing.service';
import {Response} from "@angular/http";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-persist.component.html'
})
export class PricingPersistComponent implements OnInit {

  pricing = new Pricing();
  create = true;
  errors: any[];

  private token : string;

  private apiKey : string;
  

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private modal : Modal, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.pricingService.get(+params['id'], this.token, this.apiKey).subscribe((pricing: Pricing) => {
          this.create = false;
          this.pricing = pricing;
        });
      }
    }, error => {
      this.modal.alert()
          .title('Error')
          .message(error).open();
    });
  }

  save() {
    this.pricingService.save(this.pricing, this.token, this.apiKey).subscribe((pricing: Pricing) => {
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
