import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Job} from './job';
import {JobService} from './job.service';
import {ConsignmentService} from '../consignment/consignment.service';
import {Consignment} from '../consignment/consignment';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {Permission} from "../permission/permission";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'job-persist',
  templateUrl: './job-persist.component.html',
  providers: [UserService]
})
export class JobPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  job = new Job();
  create = true;
  errors: any[];
  consignmentList: Consignment[];

  private subscription: Subscription;

  private userObject: any;

  private permission: Permission;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router, private consignmentService: ConsignmentService, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {

    this.subscription = this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.permissionService.getByUserId(this.userObject);
    }).subscribe(permission => {
      this.permission = permission;
    });

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.jobService.get(+params['id'], this.userObject).subscribe((job: Job) => {
          this.create = false;
          this.job = job;
        });
      }
    });


    //this should fundamentally change
    this.consignmentService.list(this.userObject, 0).subscribe(json => {
      let data = json['data'];

      this.consignmentList = [];

      data.forEach(consignmentDatum => {
        let consignment = new Consignment(consignmentDatum.attributes);
        consignment.id = consignmentDatum.id;
        this.consignmentList.push(consignment);
      });

    });

  }

  save() {
    this.jobService.save(this.job, this.userObject).subscribe((job: Job) => {
      this.router.navigate(['/job', 'show', job.id]);
    }, json => {
      console.log('json error '+JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors '+JSON.stringify(this.errors));
    });
  }
}
