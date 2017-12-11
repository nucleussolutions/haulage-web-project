import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MemberSubscription} from './memberSubscription';
import {MemberSubscriptionService} from './memberSubscription.service';
import { UserService } from 'app/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'memberSubscription-persist',
  templateUrl: './memberSubscription-show.component.html'
})
export class MemberSubscriptionShowComponent implements OnInit {

  memberSubscription = new MemberSubscription();

  private userObject: any;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private router: Router, private userService: UserService) {}

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      const params = result[1];

      return this.memberSubscriptionService.get(+params['id'], this.userObject);
    }).subscribe((memberSubscription: MemberSubscription) => {
        this.memberSubscription = memberSubscription;
      });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.memberSubscriptionService.destroy(this.memberSubscription, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/memberSubscription', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
