import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pricing } from './pricing';
import { PricingService } from './pricing.service';
import { Response } from "@angular/http";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { CookieService } from "ngx-cookie";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-persist.component.html',
  providers: [UserService]
})
export class PricingPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pricing = new Pricing();
  create = true;
  errors: any[];

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private modal: Modal, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.pricingService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((pricing: Pricing) => {
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
    this.pricingService.save(this.pricing, this.userObject.token, this.userObject.apiKey).subscribe((pricing: Pricing) => {
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
