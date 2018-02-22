import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ExpenseItem} from './expenseItem';
import {ExpenseItemService} from './expenseItem.service';

@Component({
  selector: 'expenseItem-persist',
  templateUrl: './expenseItem-show.component.html'
})
export class ExpenseItemShowComponent implements OnInit {

  expenseItem = new ExpenseItem();

  constructor(private route: ActivatedRoute, private expenseItemService: ExpenseItemService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.expenseItemService.get(+params['id']).subscribe((expenseItem: ExpenseItem) => {
        this.expenseItem = expenseItem;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.expenseItemService.destroy(this.expenseItem).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/expenseItem','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
