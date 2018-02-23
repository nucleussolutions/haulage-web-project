

export class ExpenseItem {
  id: number;

  reimbursable: boolean;

  billable: boolean;

  constructor (object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.ExpenseItem : ' + (this.id ? this.id : '(unsaved)');
  }
}