import {Permission} from "../permission/permission";


export class Company {
  id: number;

  name: string;
  registrationNo: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  officePhone: string;
  yardPhone: string;
  companyImageBase64: string;
  companyImgUrl: string;
  code: string;
  email: string;
  postalCode: string;

  permissions : Permission[];

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Company : ' + (this.id ? this.id : '(unsaved)');
  }
}