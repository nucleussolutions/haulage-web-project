import {Component, OnInit} from '@angular/core';
import {ExpenseItemService} from './expenseItem.service';
import {ExpenseItem} from './expenseItem';

@Component({
  selector: 'expenseItem-list',
  templateUrl: './expenseItem-list.component.html'
})
export class ExpenseItemListComponent implements OnInit {

  expenseItemList: ExpenseItem[] = [];

  constructor(private expenseItemService: ExpenseItemService) { }

  ngOnInit() {
    this.expenseItemService.list().subscribe((expenseItemList: ExpenseItem[]) => {
      this.expenseItemList = expenseItemList;
    });
  }
}
