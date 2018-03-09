import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Transaction} from './transaction';
import {TransactionService} from './transaction.service';
import {Observable} from "rxjs/Observable";
import {UserService} from "../user.service";

@Component({
  selector: 'transaction-persist',
  templateUrl: './transaction-show.component.html'
})
export class TransactionShowComponent implements OnInit {

  transaction = new Transaction();

  private userObject: any;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router, private userService: UserService) {}

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];


      if(params.hasOwnProperty('id')){
        return this.transactionService.get(+params['id'], this.userObject)
      }else{
        throw 'params id not found';
      }
    }).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transactionService.destroy(this.transaction, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transaction','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
