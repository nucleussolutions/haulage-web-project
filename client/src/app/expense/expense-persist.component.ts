import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Expense} from './expense';
import {ExpenseService} from './expense.service';
import {Response} from "@angular/http";
import { JobService } from '../job/job.service';
import { Job } from '../job/job';
import { ExpenseItemService } from '../expenseItem/expenseItem.service';
import { ExpenseItem } from '../expenseItem/expenseItem';
import { UserService } from '../user.service';

@Component({
  selector: 'expense-persist',
  templateUrl: './expense-persist.component.html'
})
export class ExpensePersistComponent implements OnInit {

  expense = new Expense();
  create = true;
  errors: any[];
  jobList: Job[];
  expenseItemList: ExpenseItem[];

  constructor(private route: ActivatedRoute, private expenseService: ExpenseService, private router: Router, private jobService: JobService, private expenseItemService: ExpenseItemService, private userService: UserService) {}

  ngOnInit() {

    this.userService.getUser().subscribe(userObject => {

    });


    this.jobService.list().subscribe((jobList: Job[]) => { this.jobList = jobList; });
    this.expenseItemService.list().subscribe((expenseItemList: ExpenseItem[]) => { this.expenseItemList = expenseItemList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.expenseService.get(+params['id']).subscribe((expense: Expense) => {
          this.create = false;
          this.expense = expense;
        });
      }
    });
  }

  save() {
    this.expenseService.save(this.expense).subscribe((expense: Expense) => {
      this.router.navigate(['/expense', 'show', expense.id]);
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
