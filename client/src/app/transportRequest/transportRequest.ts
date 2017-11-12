import { Location } from '../location/location';
import { Consignment } from '../consignment/consignment';
import { Customer } from '../customer/customer';

export class TransportRequest {
  id: number;

  containerVolume: string;
  type: string;
  equipment: string;
  bookingRefNo: string;
  otherRefNo: string;
  terminal: Location;
  vesselName: string;
  voyageNo: string;
  vesselEtaOrEtd: any;
  shippingAgent: string;
  forwardingAgent: string;
  operatorCode: string;
  hazardous: boolean;
  grossWeight: number;
  overDimension: boolean;
  temperature: number;
  productDesc: string;
  shipper: string;
  orderRemarks: string;
  containerRemarks: string;
  dgCode: string;
  kOnekEightFormImgUrl: string;
  gatePassImgUrl: string;
  bookingConfirmationImgUrl: string;
  cmoImgUrl: string;
  consignments: Consignment[];
  forwarderId: string;
  customer: Customer;
  status: string;
  portOfLoading: string;
  portOfDischarge: string;
  pickupOrDropoffEmptyDepoh: Location;
  backToBack: boolean;
  openCargoBoat: boolean;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('terminal')) {
        this.terminal = new Location(object['terminal']);
        delete object['terminal'];
      }
      
      if (object.hasOwnProperty('consignments')) {
        this.consignments = object['consignments'].map((obj: any) => { return new Consignment(obj); });
        delete object['consignments'];
      }
      
      if (object.hasOwnProperty('customer')) {
        this.customer = new Customer(object['customer']);
        delete object['customer'];
      }
      
      if (object.hasOwnProperty('pickupOrDropoffEmptyDepoh')) {
        this.pickupOrDropoffEmptyDepoh = new Location(object['pickupOrDropoffEmptyDepoh']);
        delete object['pickupOrDropoffEmptyDepoh'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.TransportRequest : ' + (this.id ? this.id : '(unsaved)');
  }
}