import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from './job.service';
import {Job} from './job';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

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

  private page : number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  private count: number = 0;

  constructor(private route: ActivatedRoute, private jobService: JobService, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.jobService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.jobService.list(userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(jobDatum => {
        let job = new Job(jobDatum.attributes);
        job.id = jobDatum.id;
        this.jobList.push(job);
      });
    });
  }
}
