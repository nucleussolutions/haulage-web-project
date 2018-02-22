import {Component, OnInit} from '@angular/core';
import {ExpenseService} from './expense.service';
import {Expense} from './expense';

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html'
})
export class ExpenseListComponent implements OnInit {

  expenseList: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.list().subscribe((expenseList: Expense[]) => {
      this.expenseList = expenseList;
    });
  }
}
