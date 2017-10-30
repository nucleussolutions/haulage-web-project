import { Location } from '../location/location';
import { Location } from '../location/location';

export class Consignment {
  id: number;

  containerNo: string;
  name: string;
  type: any;
  pickupLocation: Location;
  ladenOrDropOffLocation: Location;
  acceptTime: any;
  consignmentCode: string;
  status: any;
  size: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('pickupLocation')) {
        this.pickupLocation = new Location(object['pickupLocation']);
        delete object['pickupLocation'];
      }
      
      if (object.hasOwnProperty('ladenOrDropOffLocation')) {
        this.ladenOrDropOffLocation = new Location(object['ladenOrDropOffLocation']);
        delete object['ladenOrDropOffLocation'];
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