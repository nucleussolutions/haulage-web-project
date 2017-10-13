import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';
import { Pricing } from './pricing';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { CookieService } from "ngx-cookie";
import { Title } from '@angular/platform-browser';
import { NavDrawerService } from 'app/nav-drawer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html'
})
export class PricingListComponent implements OnInit {

  pricingList: Pricing[] = [];

  private token: string;

  private apiKey: string;

  constructor(private pricingService: PricingService, private modal: Modal, private cookieService: CookieService, private titleService: Title, private navDrawerService: NavDrawerService, private router: Router) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
    this.titleService.setTitle('Pricing List');
  }

  ngOnInit() {
    this.pricingService.list(this.token, this.apiKey).subscribe((pricingList: Pricing[]) => {
      this.pricingList = pricingList;
    }, error => {

      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      const dialog = this.modal.alert().title('Error').message(message).open();

      dialog.then(value => {
        //todo might need to navigate them back to login
        this.cookieService.removeAll();
        this.navDrawerService.trigger(false);
        this.router.navigate(['/login']);
      });
    });
  }
}
