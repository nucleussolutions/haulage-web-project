import { Pricing } from '../pricing/pricing';

export class MemberSubscription {
  id: number;

  userId: string;
  pricing: Pricing;
  monthlyRecurring: boolean;

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('pricing')) {
        this.pricing = new Pricing(object['pricing']);
        delete object['pricing'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.MemberSubscription : ' + (this.id ? this.id : '(unsaved)');
  }
}