import {TransportRequest} from "../transportRequest/transportRequest";
import {Job} from "../job/job";


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

  //todo expose rft so that we can get number to fill in the consignment note
  transportRequest: TransportRequest;

  job: Job;
  dateCreated: any;
  lastUpdated: any;

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