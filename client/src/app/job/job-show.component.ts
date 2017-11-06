import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Job} from './job';
import {JobService} from './job.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'job-persist',
    templateUrl: './job-show.component.html',
    providers: [UserService]
})
export class JobShowComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


    job = new Job();

    private subscription: Subscription;

    private userObject: any;

    constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router, private userService: UserService) {
        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.jobService.get(+params['id'], this.userObject).subscribe((job: Job) => {
                this.job = job;
            });
        });
    }

    destroy() {
        if (confirm("Are you sure?")) {
            this.jobService.destroy(this.job, this.userObject).subscribe((success: boolean) => {
                if (success) {
                    this.router.navigate(['/job', 'list']);
                } else {
                    alert("Error occurred during delete");
                }
            });
        }
    }

}
