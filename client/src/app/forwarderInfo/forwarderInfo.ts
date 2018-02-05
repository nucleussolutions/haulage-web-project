import { Company } from '../company/company';

export class ForwarderInfo {
  id: number;

  name: string;
  company: Company;
  userId: string;
  email: string;

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
    return 'haulage.project.ForwarderInfo : ' + (this.id ? this.id : '(unsaved)');
  }
}