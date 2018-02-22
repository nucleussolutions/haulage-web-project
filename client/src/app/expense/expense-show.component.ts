import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Expense} from './expense';
import {ExpenseService} from './expense.service';

@Component({
  selector: 'expense-persist',
  templateUrl: './expense-show.component.html'
})
export class ExpenseShowComponent implements OnInit {

  expense = new Expense();

  constructor(private route: ActivatedRoute, private expenseService: ExpenseService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.expenseService.get(+params['id']).subscribe((expense: Expense) => {
        this.expense = expense;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.expenseService.destroy(this.expense).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/expense','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
