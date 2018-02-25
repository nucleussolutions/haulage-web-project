import {Component, Input, OnInit} from '@angular/core';
import {QuoteItem} from "../quoteItem/quoteItem";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-quote-item-modal',
  templateUrl: './quote-item-modal.component.html',
  styleUrls: ['./quote-item-modal.component.css']
})
export class QuoteItemModalComponent implements OnInit {

  @Input()
  quoteItem : QuoteItem;
  create = true;
  errors: any[];

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {

  }

  save(){

  }
}
