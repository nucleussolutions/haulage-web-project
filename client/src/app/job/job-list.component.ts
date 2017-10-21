import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from './job.service';
import {Job} from './job';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";

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

    constructor(private jobService: JobService, private userService: UserService) {
        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });
    }

    ngOnInit() {
        this.jobService.list(this.userObject.token, this.userObject.apiKey).subscribe((jobList: Job[]) => {
            this.jobList = jobList;
        });
    }
}
