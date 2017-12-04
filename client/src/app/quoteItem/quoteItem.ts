

export class QuoteItem {
  id: number;
  desc : string;
  rebatePercent: number;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.QuoteItem : ' + (this.id ? this.id : '(unsaved)');
  }
}