import {Component, OnInit, OnDestroy} from '@angular/core';
import {ExpenseService} from './expense.service';
import {Expense} from './expense';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GeneralModalComponent} from "../general-modal/general-modal.component";



@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html'
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {

  }

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  expenseList: Expense[] = [];

  private subscription: Subscription;

  private userObject: any;

  constructor(private expenseService: ExpenseService, private userService: UserService,private titleService: Title, private router: Router, private modalService: NgbModal) {

    this.titleService.setTitle('Expenses');
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      return this.expenseService.list(this.userObject, this.offset);

    }).subscribe(json => {

      let data = json['data'];

      this.expenseList = [];

      data.forEach(expenseDatum => {
        let expense = new Expense(expenseDatum.attributes);
        expense.id = expenseDatum.id;
        this.expenseList.push(expense);
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

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/expense', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string){

  }

}
