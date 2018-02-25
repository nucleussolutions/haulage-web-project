import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuoteItem} from './quoteItem';
import {QuoteItemService} from './quoteItem.service';

@Component({
  selector: 'quoteItem-persist',
  templateUrl: './quoteItem-show.component.html'
})
export class QuoteItemShowComponent implements OnInit {

  quoteItem = new QuoteItem();

  constructor(private route: ActivatedRoute, private quoteItemService: QuoteItemService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.quoteItemService.get(+params['id']).subscribe((quoteItem: QuoteItem) => {
        this.quoteItem = quoteItem;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.quoteItemService.destroy(this.quoteItem).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/quoteItem','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
