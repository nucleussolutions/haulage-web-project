

export class Location {
  id: number;

  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  type: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Location : ' + (this.id ? this.id : '(unsaved)');
  }
}