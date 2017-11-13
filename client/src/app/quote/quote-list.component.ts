import {Component, OnInit} from '@angular/core';
import {QuoteService} from './quote.service';
import {Quote} from './quote';

@Component({
  selector: 'quote-list',
  templateUrl: './quote-list.component.html'
})
export class QuoteListComponent implements OnInit {

  quoteList: Quote[] = [];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.list().subscribe((quoteList: Quote[]) => {
      this.quoteList = quoteList;
    });
  }
}
