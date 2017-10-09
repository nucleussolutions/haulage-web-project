import {Component, OnInit} from '@angular/core';
import {PricingService} from './pricing.service';
import {Pricing} from './pricing';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html'
})
export class PricingListComponent implements OnInit {

  pricingList: Pricing[] = [];

  private token : string;

  private apiKey : string;

  constructor(private pricingService: PricingService, private modal : Modal, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.pricingService.list(this.token, this.apiKey).subscribe((pricingList: Pricing[]) => {
      this.pricingList = pricingList;
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }
}
