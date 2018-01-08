

export class DriverInfo {
  id: number;

  name: string;
  icNumber: string;
  passportNumber: string;
  phone: string;
  licenseClass: string;
  licenseExpiry: any;
  westPortPassNo: string;
  northPortPassNo: string;
  westPortPassExpiry: any;
  northPortPassExpiry: any;
  emergencyContactName: string;
  emergencyContactPhone: string;
  icFrontImgUrl: string;
  icBackImgUrl: string;
  passportImgUrl: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  haulierId: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.DriverInfo : ' + (this.id ? this.id : '(unsaved)');
  }
}