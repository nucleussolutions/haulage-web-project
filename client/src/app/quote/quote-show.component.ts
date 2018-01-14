import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quote} from './quote';
import {QuoteService} from './quote.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {observable} from "rxjs/symbol/observable";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'quote-persist',
  templateUrl: './quote-show.component.html',
})
export class QuoteShowComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  quote = new Quote();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.quoteService.get(params['id'], this.userObject);
    }).subscribe((params: Params) => {
      this.quoteService.get(params['id'], this.userObject).subscribe((quote: Quote) => {
        this.quote = quote;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.quoteService.destroy(this.quote, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/quote','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
