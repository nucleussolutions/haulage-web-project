import {Component, OnInit} from '@angular/core';
import {QuoteItemService} from './quoteItem.service';
import {QuoteItem} from './quoteItem';

@Component({
  selector: 'quoteItem-list',
  templateUrl: './quoteItem-list.component.html'
})
export class QuoteItemListComponent implements OnInit {

  quoteItemList: QuoteItem[] = [];

  constructor(private quoteItemService: QuoteItemService) { }

  ngOnInit() {
    // this.quoteItemService.list().subscribe((quoteItemList: QuoteItem[]) => {
    //   this.quoteItemList = quoteItemList;
    // });
  }
}
