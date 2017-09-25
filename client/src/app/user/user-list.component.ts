


import {Component, OnInit} from "@angular/core";
import {User} from "./user";
import {UserService} from "../user.service";

@Component({
    selector: '',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{

    userList: User[] = [];

    constructor(private userService : UserService){
    }

    ngOnInit() {
        this.userService.list().subscribe((userList: User[]) => {
            this.userList = userList;
        });    }
}