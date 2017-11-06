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


  constructor(private jobService: JobService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().flatMap(userObject => this.jobService.list(this.userObject)).subscribe((jobList: Job[]) => {
      this.jobList = jobList;
    });
  }
}
