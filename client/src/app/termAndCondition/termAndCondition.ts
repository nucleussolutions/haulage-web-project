export class TermAndCondition {
  id: number;
  desc: string;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.TermAndCondition : ' + (this.id ? this.id : '(unsaved)');
  }
}