import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Expense} from './expense';
import {ExpenseService} from './expense.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'expense-persist',
  templateUrl: './expense-show.component.html'
})
export class ExpenseShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  expense = new Expense();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private expenseService: ExpenseService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];


      if(params.hasOwnProperty('id')){
        return this.expenseService.get(+params['id'], this.userObject);
      }else{
        console.log('params id not found, nothing to see here');
      }

    }).subscribe((expense: Expense) => {
      this.expense = expense;
    });

  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.expenseService.destroy(this.expense, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/expense','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
