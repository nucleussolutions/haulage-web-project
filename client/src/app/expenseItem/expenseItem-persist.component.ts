import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ExpenseItem} from './expenseItem';
import {ExpenseItemService} from './expenseItem.service';
import {Response} from "@angular/http";


@Component({
  selector: 'expenseItem-persist',
  templateUrl: './expenseItem-persist.component.html'
})
export class ExpenseItemPersistComponent implements OnInit {

  expenseItem = new ExpenseItem();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private expenseItemService: ExpenseItemService, private router: Router) {}

  ngOnInit() {
    this.expenseItem.reimbursable = false;
    this.expenseItem.billable = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.expenseItemService.get(+params['id']).subscribe((expenseItem: ExpenseItem) => {
          this.create = false;
          this.expenseItem = expenseItem;
        });
      }
    });
  }

  save() {
    this.expenseItemService.save(this.expenseItem).subscribe((expenseItem: ExpenseItem) => {
      this.router.navigate(['/expenseItem', 'show', expenseItem.id]);
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
