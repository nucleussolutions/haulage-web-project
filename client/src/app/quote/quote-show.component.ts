import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quote} from './quote';
import {QuoteService} from './quote.service';

@Component({
  selector: 'quote-persist',
  templateUrl: './quote-show.component.html'
})
export class QuoteShowComponent implements OnInit {

  quote = new Quote();

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.quoteService.get(+params['id']).subscribe((quote: Quote) => {
        this.quote = quote;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.quoteService.destroy(this.quote).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/quote','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
