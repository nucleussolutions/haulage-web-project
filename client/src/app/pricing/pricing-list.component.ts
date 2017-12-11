import {Component, OnDestroy, OnInit} from '@angular/core';
import { PricingService } from './pricing.service';
import { Pricing } from './pricing';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'app/user.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";


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

  private page: number = 0;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService) {
    this.titleService.setTitle('Pricing List');
  }

  ngOnInit() {


    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {


      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.pricingService.list(userObject, this.page);
    }).subscribe((pricingList: Pricing[]) => {
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

      dialog.result.then(result => {
        this.router.navigate(['/login']);
      });
    });
  }
}
