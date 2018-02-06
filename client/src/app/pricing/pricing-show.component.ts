import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pricing } from './pricing';
import { PricingService } from './pricing.service';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'pricing-persist',
  templateUrl: './pricing-show.component.html',
})
export class PricingShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  pricing = new Pricing();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private pricingService: PricingService, private router: Router, private userService: UserService, private modalService: NgbModal) {


  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.pricingService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found'
      }
    }).subscribe((pricing: Pricing) => {
      this.pricing = pricing;
    }, error => {
      console.log('pricing show error ' + JSON.stringify(error));
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = "Internal server error";
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      let errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = message;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.pricingService.destroy(this.pricing, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/pricing', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
