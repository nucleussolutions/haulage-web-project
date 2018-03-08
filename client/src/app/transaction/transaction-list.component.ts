import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from './transaction.service';
import {Transaction} from './transaction';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../vehicle/vehicle";

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  transactionList: Transaction[] = [];

  private subscription: Subscription;

  private userObject: any;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  constructor(private transactionService: TransactionService, private userService: UserService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.transactionService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.transactionService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];

      this.transactionList = [];

      data.forEach(txDatum => {
        let transaction = new Transaction(txDatum.attributes);
        transaction.id = txDatum.id;
        this.transactionList.push(transaction);
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

      console.log('error.status ' + error.status);

      const errorModalComponent = this.modalService.open(GeneralModalComponent);
      errorModalComponent.componentInstance.modalTitle = 'Error';
      errorModalComponent.componentInstance.modalMessage = message;
    });
  }

  search(term: string) {
    Observable.of(term).debounceTime(200).distinctUntilChanged().switchMap(term => term.length < 2 && this.userObject ? Observable.of<Transaction[]>([]) : this.transactionService.search(term, this.userObject)).subscribe(json => {
      this.transactionList = json['searchResults'];
    }, error => {
      console.log(`Error in component ... ${error}`);
      return Observable.of<Transaction[]>([]);
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/transaction', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }
}
