import {Component, OnDestroy, OnInit} from '@angular/core';
import { PricingService } from './pricing.service';
import { Pricing } from './pricing';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html',
})
export class PricingListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pricingList: Pricing[] = [];

  private subscription: Subscription;

  constructor(private pricingService: PricingService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService) {
    this.titleService.setTitle('Pricing List');
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => this.pricingService.list(userObject)).subscribe((pricingList: Pricing[]) => {
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
        this.router.navigate(['/login']);
      });
    });
  }
}
