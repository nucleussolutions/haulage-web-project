import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {QuoteService} from "../quote/quote.service";
import {Quote} from "../quote/quote";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quotation-template',
  templateUrl: './quotation-template.component.html',
  styleUrls: ['./quotation-template.component.css']
})
export class QuotationTemplateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  private userObject: any;

  quote: Quote;

  forwarderInfo : ForwarderInfo;

  haulierInfo: HaulierInfo;

  private subscription:Subscription;

  constructor(private userService: UserService, private quoteService: QuoteService, private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private haulierInfoService: HaulierInfoService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.quoteService.get(params['id'], this.userObject);
    }).flatMap(quote => {
      this.quote = quote;
      return this.forwarderInfoService.getByUserId(this.quote.forwarderId, this.userObject);
    }).flatMap(forwarderInfo => {
      this.forwarderInfo = forwarderInfo;
      return this.haulierInfoService.getByUserId(this.quote.haulierId, this.userObject);
    }).subscribe(haulierInfo => {
      this.haulierInfo = haulierInfo;

      setTimeout(() => {
        window.print();
      });
    });
  }
}
