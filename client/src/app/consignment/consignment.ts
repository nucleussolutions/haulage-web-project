

export class Consignment {
  id: number;

  containerNo: string;
  name: string;
  type: string;
  acceptTime: any;
  consignmentCode: string;
  status: string;
  taskType: string;
  size: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Consignment : ' + (this.id ? this.id : '(unsaved)');
  }
}