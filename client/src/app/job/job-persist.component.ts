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

  private permissions: Permission[];

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router, private consignmentService: ConsignmentService, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.jobService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found, nothing to see here';
      }
    }).subscribe((job: Job) => {
      this.create = false;
      this.job = job;
    });

    this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
      this.permissions = permissions;
    });

    this.consignmentService.listByStatus(this.userObject, 'Pending').subscribe(json => {
      console.log('consignment listByStatus json ' + JSON.stringify(json));
    });


    //show pending consignments by user

    //this should fundamentally change
    // this.consignmentService.list(this.userObject, 0).subscribe(json => {
    //   let data = json['data'];
    //
    //   this.consignmentList = [];
    //
    //   data.forEach(consignmentDatum => {
    //     let consignment = new Consignment(consignmentDatum.attributes);
    //     consignment.id = consignmentDatum.id;
    //     this.consignmentList.push(consignment);
    //   });
    //
    // });

  }

  save() {
    this.jobService.save(this.job, this.userObject).subscribe((job: Job) => {
      this.router.navigate(['/job', 'show', job.id]);
    }, json => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }
}
