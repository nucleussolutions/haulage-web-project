

export class Vehicle {
  id: number;

  internalNumber: string;
  registrationNumber: string;
  type: string;
  otherInfo: string;
  roadTaxRenewalDate: any;
  licenseExpiryDate: any;
  puspakomExpiryDate: any;
  model: string;
  licensePlateNumber: string;
  netWeight: number;
  spadPermitExpiryDate: any;
  insuranceExpiryDate: any;
  userId: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Vehicle : ' + (this.id ? this.id : '(unsaved)');
  }
}