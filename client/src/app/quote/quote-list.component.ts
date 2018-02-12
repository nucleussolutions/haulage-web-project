import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuoteService} from './quote.service';
import {Quote} from './quote';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'quote-list',
  templateUrl: './quote-list.component.html',
})
export class QuoteListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  quoteList: Quote[] = [];

  private subscription: Subscription;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private userService: UserService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.callQuotes();
  }

  callQuotes(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      //count
      this.quoteService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.quoteService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];

      this.quoteList = [];

      if(data){
        data.forEach(quoteDatum => {
          let quote = new Quote(quoteDatum.attributes);
          quote.id = quoteDatum.id;
          this.quoteList.push(quote);
        });
      }

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

      const errorModalRef = this.modalService.open(GeneralModalComponent)
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = message;
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset '+offset);
    this.offset = offset;
    this.router.navigate(['/quote', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }

  search(term: string){
    if(term.length > 2){
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.quoteService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Quote[]>([]))
        .subscribe(json => {
          this.quoteList = json['searchResults'];
          this.count = json['total'];
        }, error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Quote[]>([]);
      });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callQuotes();
      });
    }
  }

}
