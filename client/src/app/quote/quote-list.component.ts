import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuoteService} from './quote.service';
import {Quote} from './quote';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Modal} from "ngx-modialog/plugins/bootstrap";

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

  private page: number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private userService: UserService, private modal: Modal) {
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.quoteService.list(userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(quoteDatum => {
        let quote = new Quote(quoteDatum.attributes);
        quote.id = quoteDatum.id;
        this.quoteList.push(quote);
      });
    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      console.log('error.status '+error.status);

      const dialog = this.modal.alert().title('Error').message(message).open();

    });

  }
}
