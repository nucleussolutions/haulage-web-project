import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from './job.service';
import {Job} from './job';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    providers: [UserService]
})
export class JobListComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    jobList: Job[] = [];

    private subscription: Subscription;

    private userObject: any;

    private permission : any;

    constructor(private jobService: JobService, private userService: UserService, private permissionService: PermissionService) {
        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;

            this.permissionService.getByUserId(this.userObject.uid, this.userObject.token, this.userObject.apiKey).subscribe(permission => {
                this.permission = permission;
            });
        });
    }

    ngOnInit() {
        this.jobService.list(this.userObject.token, this.userObject.apiKey).subscribe((jobList: Job[]) => {
            this.jobList = jobList;
        });
    }
}
