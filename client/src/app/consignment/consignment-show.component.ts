import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-show.component.html'
})
export class ConsignmentShowComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  consignment = new Consignment();

    private subscription: Subscription;

    private userObject: any;

    constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
        this.userObject = response;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.consignmentService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((consignment: Consignment) => {
        this.consignment = consignment;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.consignmentService.destroy(this.consignment, this.userObject.token, this.userObject.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/consignment','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
