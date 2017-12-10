import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MemberSubscription} from './memberSubscription';
import {MemberSubscriptionService} from './memberSubscription.service';

@Component({
  selector: 'memberSubscription-persist',
  templateUrl: './memberSubscription-show.component.html'
})
export class MemberSubscriptionShowComponent implements OnInit {

  memberSubscription = new MemberSubscription();

  constructor(private route: ActivatedRoute, private memberSubscriptionService: MemberSubscriptionService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.memberSubscriptionService.get(+params['id']).subscribe((memberSubscription: MemberSubscription) => {
        this.memberSubscription = memberSubscription;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.memberSubscriptionService.destroy(this.memberSubscription).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/memberSubscription','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
