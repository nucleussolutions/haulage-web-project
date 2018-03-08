import {Component, OnInit} from '@angular/core';
import {TransactionService} from './transaction.service';
import {Transaction} from './transaction';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  transactionList: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.list().subscribe((transactionList: Transaction[]) => {
      this.transactionList = transactionList;
    });
  }
}
