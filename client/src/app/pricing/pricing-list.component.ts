import {Component, OnDestroy, OnInit} from '@angular/core';
import {PricingService} from './pricing.service';
import {Pricing} from './pricing';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'app/user.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'pricing-list',
  templateUrl: './pricing-list.component.html',
})
export class PricingListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  pricingList: Pricing[] = [];

  private subscription: Subscription;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private titleService: Title, private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.titleService.setTitle('Pricing List');
  }

  ngOnInit() {


    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {


      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.pricingService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.pricingService.list(userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];

      this.pricingList = [];

      data.forEach(pricingDatum => {
        let pricing = new Pricing(pricingDatum.attributes);
        pricing.id = pricingDatum.id;
        this.pricingList.push(pricing);
      });
    }, error => {
      let message;
      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      let modalRef = this.modalService.open(GeneralModalComponent);
      modalRef.componentInstance.modalTitle = 'Error';
      modalRef.componentInstance.modalMessage = message;
    });
  }
}
