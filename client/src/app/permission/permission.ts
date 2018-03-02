import {UserInfo} from "../userInfo/userInfo";
import {Company} from "../company/company";


export class Permission {
  id: number;

  email: string;
  authority: string;
  grantedBy: string;

  company: Company;

  userInfo: UserInfo;

  role: string;

  //pending approval or approved
  status: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Permission : ' + (this.id ? this.id : '(unsaved)');
  }
}