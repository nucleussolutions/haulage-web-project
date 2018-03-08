import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Transaction} from './transaction';
import {TransactionService} from './transaction.service';

@Component({
  selector: 'transaction-persist',
  templateUrl: './transaction-show.component.html'
})
export class TransactionShowComponent implements OnInit {

  transaction = new Transaction();

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transactionService.get(+params['id']).subscribe((transaction: Transaction) => {
        this.transaction = transaction;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transactionService.destroy(this.transaction).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transaction','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
