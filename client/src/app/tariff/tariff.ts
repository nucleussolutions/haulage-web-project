import { Location } from '../location/location';

export class Tariff {
  id: number;

  desc: string;
  location: Location;
  zone: string;
  tollCharges: number;
  faf: number;
  haulageCharges: number;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('location')) {
        this.location = new Location(object['location']);
        delete object['location'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Tariff : ' + (this.id ? this.id : '(unsaved)');
  }
}