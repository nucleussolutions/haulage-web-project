


import {Component, OnInit} from "@angular/core";
import {User} from "./user";
import {UserService} from "../user.service";

@Component({
    selector: '',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{


    constructor(private userService : UserService){
        //todo list by who's under the haulier
        this.userService.list().subscribe()
    }

    ngOnInit() {
        // throw new Error('Method not implemented.');
    }

    userList: User[] = [];


}