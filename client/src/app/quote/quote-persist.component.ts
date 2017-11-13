import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quote} from './quote';
import {QuoteService} from './quote.service';
import {Response} from "@angular/http";
import { TermAndConditionService } from '../termAndCondition/termAndCondition.service';
import { TermAndCondition } from '../termAndCondition/termAndCondition';
import { QuoteItemService } from '../quoteItem/quoteItem.service';
import { QuoteItem } from '../quoteItem/quoteItem';

@Component({
  selector: 'quote-persist',
  templateUrl: './quote-persist.component.html'
})
export class QuotePersistComponent implements OnInit {

  quote = new Quote();
  create = true;
  errors: any[];
  termAndConditionList: TermAndCondition[];
  quoteItemList: QuoteItem[];

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router, private termAndConditionService: TermAndConditionService, private quoteItemService: QuoteItemService) {}

  ngOnInit() {
    this.termAndConditionService.list().subscribe((termAndConditionList: TermAndCondition[]) => { this.termAndConditionList = termAndConditionList; });
    this.quoteItemService.list().subscribe((quoteItemList: QuoteItem[]) => { this.quoteItemList = quoteItemList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.quoteService.get(+params['id']).subscribe((quote: Quote) => {
          this.create = false;
          this.quote = quote;
        });
      }
    });
  }

  save() {
    this.quoteService.save(this.quote).subscribe((quote: Quote) => {
      this.router.navigate(['/quote', 'show', quote.id]);
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
