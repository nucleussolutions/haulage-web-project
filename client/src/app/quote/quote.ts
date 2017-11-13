import { TermAndCondition } from '../termAndCondition/termAndCondition';
import { QuoteItem } from '../quoteItem/quoteItem';

export class Quote {
  id: number;

  haulierId: string;
  forwarderId: string;
  status: string;
  code: string;
  terms: TermAndCondition[];
  items: QuoteItem[];
  endDate: any;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('terms')) {
        this.terms = object['terms'].map((obj: any) => { return new TermAndCondition(obj); });
        delete object['terms'];
      }
      
      if (object.hasOwnProperty('items')) {
        this.items = object['items'].map((obj: any) => { return new QuoteItem(obj); });
        delete object['items'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Quote : ' + (this.id ? this.id : '(unsaved)');
  }
}