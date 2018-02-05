

export class Permission {
  id: number;

  email: string;
  userId: string;
  authority: string;
  grantedBy: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'haulage.project.Permission : ' + (this.id ? this.id : '(unsaved)');
  }
}