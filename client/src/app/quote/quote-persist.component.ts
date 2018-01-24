import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quote} from './quote';
import {QuoteService} from './quote.service';
import {Response} from "@angular/http";
import {TermAndConditionService} from '../termAndCondition/termAndCondition.service';
import {TermAndCondition} from '../termAndCondition/termAndCondition';
import {QuoteItemService} from '../quoteItem/quoteItem.service';
import {QuoteItem} from '../quoteItem/quoteItem';
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {Subscription} from "rxjs/Subscription";
import {Permission} from "../permission/permission";

@Component({
  selector: 'quote-persist',
  templateUrl: './quote-persist.component.html',
})
export class QuotePersistComponent implements OnInit {

  quote = new Quote();
  create = true;
  errors: any[];
  termAndConditionList: TermAndCondition[];
  quoteItemList: QuoteItem[];

  private userObject: any;

  private subscription: Subscription;

  permission: Permission;

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router, private termAndConditionService: TermAndConditionService, private quoteItemService: QuoteItemService, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });

    this.permissionService.getByUserId(this.userObject).subscribe(permission => {
      this.permission = permission;
    });


    this.termAndConditionService.list(this.userObject).subscribe((termAndConditionList: TermAndCondition[]) => {
      this.termAndConditionList = termAndConditionList;
    });
    this.quoteItemService.list(this.userObject).subscribe((quoteItemList: QuoteItem[]) => {
      this.quoteItemList = quoteItemList;
    });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.quoteService.get(+params['id'], this.userObject).subscribe((quote: Quote) => {
          this.create = false;
          this.quote = quote;
        });
      }
    });
  }

  save() {
    this.quoteService.save(this.quote, this.userObject).subscribe((quote: Quote) => {
      this.router.navigate(['/quote', 'show', quote.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
