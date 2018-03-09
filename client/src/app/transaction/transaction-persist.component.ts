import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Transaction} from './transaction';
import {TransactionService} from './transaction.service';
import {Response} from "@angular/http";
import { MemberSubscriptionService } from '../memberSubscription/memberSubscription.service';
import { MemberSubscription } from '../memberSubscription/memberSubscription';
import {Observable} from "rxjs/Observable";
import {UserService} from "../user.service";

@Component({
  selector: 'transaction-persist',
  templateUrl: './transaction-persist.component.html'
})
export class TransactionPersistComponent implements OnInit {

  transaction = new Transaction();
  create = true;
  errors: any[];
  memberSubscriptionList: MemberSubscription[];

  private userObject: any;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router, private memberSubscriptionService: MemberSubscriptionService, private userService: UserService) {}

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.transactionService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found. nothing to see here';
      }
    }).subscribe((transaction: Transaction) => {
      this.create = false;
      this.transaction = transaction;
    });

    // this.memberSubscriptionService.list().subscribe((memberSubscriptionList: MemberSubscription[]) => { this.memberSubscriptionList = memberSubscriptionList; });
  }

  save() {
    this.transactionService.save(this.transaction, this.userObject).subscribe((transaction: Transaction) => {
      this.router.navigate(['/transaction', 'show', transaction.id]);
    }, json => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }
}
