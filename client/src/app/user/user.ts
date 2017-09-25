

export class User {
    id: string;
    email: string;
    password: string;
    role : string;

    constructor(object? : any){
        if(object){
            for (var prop in object) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'haulage.project.User : ' + (this.id ? this.id : '(unsaved)');
    }
}