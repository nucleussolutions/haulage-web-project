

import {Component} from "@angular/core";
import {UserService} from "../user.service";

@Component({
    selector: 'user-persist',
    templateUrl: 'user-persist.component.html',
})
export class UserPersistComponent {

    constructor(private userService: UserService){

    }

    save(){
        // this.userService.save()
    }
}

