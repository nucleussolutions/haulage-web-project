import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from './job';
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../user.service";
import { PermissionService } from "../permission/permission.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  jobList: Job[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private jobService: JobService, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      this.jobService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.jobService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.jobList = [];

      data.forEach(jobDatum => {
        let job = new Job(jobDatum.attributes);
        job.id = jobDatum.id;
        this.jobList.push(job);
      });
    });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounce(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.jobService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Job[]>([]))
        .subscribe(jobList => {
          this.jobList = jobList;
        })
        .catch(error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Job[]>([]);
        });
    }
  }
}
