import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pricing } from './pricing';
import { PricingService } from './pricing.service';
import { CookieService } from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-show.component.html',
})
export class PricingShowComponent implements OnInit {

  pricing = new Pricing();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private userService: UserService, private modal: Modal) {

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.pricingService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((pricing: Pricing) => {
        this.pricing = pricing;
      });
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.pricingService.destroy(this.pricing, this.userObject.token, this.userObject.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/pricing', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
