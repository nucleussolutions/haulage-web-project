import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Job } from './job';
import { JobService } from './job.service';
import { ConsignmentService } from '../consignment/consignment.service';
import { Consignment } from '../consignment/consignment';
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../user.service";
import { PermissionService } from "../permission/permission.service";

@Component({
    selector: 'job-persist',
    templateUrl: './job-persist.component.html',
    providers: [UserService]
})
export class JobPersistComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    job = new Job();
    create = true;
    errors: any[];
    consignmentList: Consignment[];

    private subscription: Subscription;

    private userObject: any;

    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router, private consignmentService: ConsignmentService, private userService: UserService, private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.subscription = this.userService.getUser().subscribe(userObject => {
            this.userObject = userObject;
        });

        this.consignmentService.list(this.userObject, 1).subscribe((consignmentList: Consignment[]) => {
            this.consignmentList = consignmentList;
        });
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.jobService.get(+params['id'], this.userObject).subscribe((job: Job) => {
                    this.create = false;
                    this.job = job;
                });
            }
        });
    }

    save() {
        this.jobService.save(this.job, this.userObject).subscribe((job: Job) => {
            this.router.navigate(['/job', 'show', job.id]);
        }, (res: Response) => {
            const json = res.json();
            if (json.hasOwnProperty('message')) {
                this.errors = [json];
            } else {
                // this.errors = json._embedded.errors;
            }
        });
    }
}
