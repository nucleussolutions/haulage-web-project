import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Transaction} from './transaction';
import {TransactionService} from './transaction.service';
import {Response} from "@angular/http";
import { MemberSubscriptionService } from '../memberSubscription/memberSubscription.service';
import { MemberSubscription } from '../memberSubscription/memberSubscription';

@Component({
  selector: 'transaction-persist',
  templateUrl: './transaction-persist.component.html'
})
export class TransactionPersistComponent implements OnInit {

  transaction = new Transaction();
  create = true;
  errors: any[];
  memberSubscriptionList: MemberSubscription[];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router, private memberSubscriptionService: MemberSubscriptionService) {}

  ngOnInit() {
    this.memberSubscriptionService.list().subscribe((memberSubscriptionList: MemberSubscription[]) => { this.memberSubscriptionList = memberSubscriptionList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.transactionService.get(+params['id']).subscribe((transaction: Transaction) => {
          this.create = false;
          this.transaction = transaction;
        });
      }
    });
  }

  save() {
    this.transactionService.save(this.transaction).subscribe((transaction: Transaction) => {
      this.router.navigate(['/transaction', 'show', transaction.id]);
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
