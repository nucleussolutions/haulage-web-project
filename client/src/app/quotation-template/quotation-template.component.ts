import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {QuoteService} from "../quote/quote.service";
import {Quote} from "../quote/quote";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import {Subscription} from 'rxjs/Subscription';

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
        this.print();
      });
    });
  }

  print(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
          <link rel="stylesheet" href="./quotation-template.component.css" />
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
