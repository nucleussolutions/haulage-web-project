

export class QuoteItem {
  id: number;

  

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