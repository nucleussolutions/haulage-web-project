import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuoteService} from './quote.service';
import {Quote} from './quote';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";

@Component({
  selector: 'quote-list',
  templateUrl: './quote-list.component.html',
})
export class QuoteListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  quoteList: Quote[] = [];

  private subscription: Subscription;

  constructor(private quoteService: QuoteService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => this.quoteService.list(userObject, 1)).subscribe((quoteList: Quote[]) => {
      this.quoteList = quoteList;
    });

    //todo support paging
  }
}
