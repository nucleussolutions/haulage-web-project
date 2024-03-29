import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from './job';
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../user.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
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
    this.callJobs();
  }

  callJobs(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {


      console.log('jobs list flatmap');

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      this.jobService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      //todo count by haulier as well, kill me

      //todo list by haulier

      console.log('userObject '+this.userObject);

      console.log('offset '+this.offset);

      return this.jobService.list(this.userObject, this.offset);
    }).subscribe(json => {

      console.log('job list json');

      let data = json['data'];

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
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.jobService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Job[]>([]))
        .subscribe(json => {
          this.jobList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Job[]>([]);
        });
    }else{
      //todo recall the original api call again
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callJobs();
      });
    }
  }
}
