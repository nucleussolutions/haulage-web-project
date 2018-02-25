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
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  permissions: Permission[];

  constructor(private route: ActivatedRoute, private quoteService: QuoteService, private router: Router, private termAndConditionService: TermAndConditionService, private quoteItemService: QuoteItemService, private userService: UserService, private permissionService: PermissionService, private modalService: NgbModal) {
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
        this.permissions = permissions;
      });

      if (params.hasOwnProperty('id')) {
        return this.quoteService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found, nothing to see here';
      }
    }).subscribe((quote: Quote) => {
      this.create = false;
      this.quote = quote;
    });

    // this.termAndConditionService.list(this.userObject).subscribe((termAndConditionList: TermAndCondition[]) => {
    //   this.termAndConditionList = termAndConditionList;
    // });
    // this.quoteItemService.list(this.userObject).subscribe((quoteItemList: QuoteItem[]) => {
    //   this.quoteItemList = quoteItemList;
    // });
  }

  save() {
    this.quoteService.save(this.quote, this.userObject).subscribe((quote: Quote) => {
      this.router.navigate(['/quote', 'show', quote.id]);
    }, (json) => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }

  addTerm(){

  }

  editTerm(position: number){

  }

  addQuoteItem(){

  }

  editQuoteItem(position: number){
    let quoteItem = this.quoteItemList[position];
    // this.modalService.open()
  }
}
