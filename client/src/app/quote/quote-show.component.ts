import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quote} from './quote';
import {QuoteService} from './quote.service';
import {UserService} from "../user.service";

@Component({
  selector: 'quote-persist',
  templateUrl: './quote-show.component.html',
  providers: [UserService]
})
export class QuoteShowComponent implements OnInit {

  quote = new Quote();

  private userObject: any;

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router, private userService: UserService) {}

  ngOnInit() {

    this.userService.getUser().subscribe(userObject=> {
      this.userObject = userObject;
    });

    this.route.params.subscribe((params: Params) => {
      this.quoteService.get(+params['id'], this.userObject).subscribe((quote: Quote) => {
        this.quote = quote;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.quoteService.destroy(this.quote, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/quote','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
