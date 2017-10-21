import { Consignment } from '../consignment/consignment';

export class Job {
  id: number;

  consignments: Consignment[];
  haulierId: string;
  driverId: string;
  status: any;
  startDateTime: any;
  endDateTime: any;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('consignments')) {
        this.consignments = object['consignments'].map((obj: any) => { return new Consignment(obj); });
        delete object['consignments'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Job : ' + (this.id ? this.id : '(unsaved)');
  }
}