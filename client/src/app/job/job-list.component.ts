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

  private permission: any;

  constructor(private jobService: JobService, private userService: UserService, private permissionService: PermissionService) {
    this.subscription.add(this.userService.getUser().subscribe(response => {
      this.userObject = response;
      this.checkPermissions();
    }));
  }

  checkPermissions(): void {
    this.subscription.add(this.permissionService.getByUserId(this.userObject).subscribe(permission => {
      this.permission = permission;
      if(this.permission.authority == 'Super Admin' || this.permission.authority == 'Admin'){
        this.listJobs();
      }
    }));
  }

  listJobs() : void {
    this.jobService.list(this.userObject.token, this.userObject.apiKey).subscribe((jobList: Job[]) => {
      this.jobList = jobList;
    });
  }

  ngOnInit() {

  }
}
