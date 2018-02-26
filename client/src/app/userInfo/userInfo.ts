import { Company } from '../company/company';
import { Permission } from '../permission/permission';

export class UserInfo {
  id: number;

  name: string;
  company: Company;
  userId: string;
  permissions: Permission[];

  notifKey : string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('company')) {
        this.company = new Company(object['company']);
        delete object['company'];
      }
      
      if (object.hasOwnProperty('permissions')) {
        this.permissions = object['permissions'].map((obj: any) => { return new Permission(obj); });
        delete object['permissions'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.UserInfo : ' + (this.id ? this.id : '(unsaved)');
  }
}