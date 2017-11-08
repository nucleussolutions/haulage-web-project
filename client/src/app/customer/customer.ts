

export class Customer {
  id: number;

  companyName: string;
  personInCharge: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Customer : ' + (this.id ? this.id : '(unsaved)');
  }
}