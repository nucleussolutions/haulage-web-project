import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuoteItem} from './quoteItem';
import {QuoteItemService} from './quoteItem.service';
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'quoteItem-persist',
  templateUrl: './quoteItem-persist.component.html'
})
export class QuoteItemPersistComponent implements OnInit {

  quoteItem = new QuoteItem();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private quoteItemService: QuoteItemService, private router: Router) {}

  ngOnInit() {

    // this.route.params.subscribe((params: Params) => {
    //   if (params.hasOwnProperty('id')) {
    //     this.quoteItemService.get(+params['id']).subscribe((quoteItem: QuoteItem) => {
    //       this.create = false;
    //       this.quoteItem = quoteItem;
    //     });
    //   }
    // });

  }

  save() {
    // this.quoteItemService.save(this.quoteItem).subscribe((quoteItem: QuoteItem) => {
    //   this.router.navigate(['/quoteItem', 'show', quoteItem.id]);
    // }, (res: Response) => {
    //   const json = res.json();
    //   if (json.hasOwnProperty('message')) {
    //     this.errors = [json];
    //   } else {
    //     this.errors = json._embedded.errors;
    //   }
    // });
  }
}
