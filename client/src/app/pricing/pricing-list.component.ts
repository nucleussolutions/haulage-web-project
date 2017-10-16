import { Component, OnInit } from '@angular/core';
import { PricingService } from './pricing.service';
import { Pricing } from './pricing';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { CookieService } from "ngx-cookie";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';


@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html',
  providers: [UserService]
})
export class PricingListComponent implements OnInit {

  pricingList: Pricing[] = [];

  private userObject: any;

  constructor(private pricingService: PricingService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService) {
    // this.token = this.cookieService.get('token');
    // this.apiKey = this.cookieService.get('apiKey');
    this.titleService.setTitle('Pricing List');
  }

  ngOnInit() {

    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    }, error => {

    });

    this.userService.loginState$.subscribe(loggedIn => {

    });

    this.pricingService.list(this.userObject.token, this.userObject.apiKey).subscribe((pricingList: Pricing[]) => {
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
        // this.cookieService.removeAll();
        // this.navDrawerService.trigger(false);
        this.router.navigate(['/login']);
      });
    });
  }
}
