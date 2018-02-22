import { Job } from '../job/job';
import { ExpenseItem } from '../expenseItem/expenseItem';

export class Expense {
  id: number;

  job: Job;
  items: ExpenseItem[];

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('job')) {
        this.job = new Job(object['job']);
        delete object['job'];
      }
      
      if (object.hasOwnProperty('items')) {
        this.items = object['items'].map((obj: any) => { return new ExpenseItem(obj); });
        delete object['items'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Expense : ' + (this.id ? this.id : '(unsaved)');
  }
}