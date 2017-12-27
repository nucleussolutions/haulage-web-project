import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {QuoteService} from "../quote/quote.service";
import {Quote} from "../quote/quote";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {HaulierInfo} from "../haulierInfo/haulierInfo";

@Component({
  selector: 'app-quotation-template',
  templateUrl: './quotation-template.component.html',
  styleUrls: ['./quotation-template.component.css']
})
export class QuotationTemplateComponent implements OnInit {

  private userObject: any;

  quote: Quote;

  forwarderInfo : ForwarderInfo;

  haulierInfo: HaulierInfo;

  constructor(private userService: UserService, private quoteService: QuoteService, private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private haulierInfoService: HaulierInfoService) {
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];


      return this.quoteService.get(params['id'], this.userObject);
    }).subscribe(quote => {
      this.quote = quote;

      this.forwarderInfoService.getByUserId(this.quote.forwarderId, this.userObject).subscribe(forwarderInfo => {
        this.forwarderInfo = forwarderInfo;
      });

      this.haulierInfoService.getByUserId(this.quote.haulierId, this.userObject).subscribe(haulierInfo => {
        this.haulierInfo = haulierInfo
      });

    });

  }

}
