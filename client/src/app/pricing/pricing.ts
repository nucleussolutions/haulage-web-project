

export class Pricing {
  id: number;

  discountPercent: number;
  price: number;
  pricePerMove: number;
  minPrimeMover: number;
  maxPrimeMover: number;
  description: string;
  name: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Pricing : ' + (this.id ? this.id : '(unsaved)');
  }
}