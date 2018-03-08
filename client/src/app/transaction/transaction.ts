import { MemberSubscription } from '../memberSubscription/memberSubscription';

export class Transaction {
  id: number;

  status: string;
  subscription: MemberSubscription;

  code: string;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('subscription')) {
        this.subscription = new MemberSubscription(object['subscription']);
        delete object['subscription'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Transaction : ' + (this.id ? this.id : '(unsaved)');
  }
}