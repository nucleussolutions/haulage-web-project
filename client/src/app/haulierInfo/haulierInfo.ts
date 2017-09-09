import { Company } from '../company/company';

export class HaulierInfo {
  id: number;

  name: string;
  company: Company;
  userId: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('company')) {
        this.company = new Company(object['company']);
        delete object['company'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.HaulierInfo : ' + (this.id ? this.id : '(unsaved)');
  }
}