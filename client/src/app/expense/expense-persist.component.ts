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
import {Observable} from "rxjs/Observable";


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

  private userObject: any;

  constructor(private route: ActivatedRoute, private expenseService: ExpenseService, private router: Router, private jobService: JobService, private expenseItemService: ExpenseItemService, private userService: UserService) {}

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.expenseService.get(+params['id'], this.userObject);
      }else{
        console.log('params id not found, nothing to see here');
      }
    }).subscribe((expense: Expense) => {
      this.create = false;
      this.expense = expense;
    });
    // this.jobService.list().subscribe((jobList: Job[]) => { this.jobList = jobList; });
  }

  save() {
    this.expenseService.save(this.expense, this.userObject).subscribe((expense: Expense) => {
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
