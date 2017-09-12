import { Location } from '../location/location';

export class Consignment {
  id: number;

  containerNo: string;
  name: string;
  type: string;
  pickupLadenDropoff: Location;
  acceptTime: any;
  consignmentCode: string;
  size: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('pickupLadenDropoff')) {
        this.pickupLadenDropoff = new Location(object['pickupLadenDropoff']);
        delete object['pickupLadenDropoff'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Consignment : ' + (this.id ? this.id : '(unsaved)');
  }
}