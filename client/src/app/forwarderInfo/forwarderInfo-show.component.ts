import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ForwarderInfo } from './forwarderInfo';
import { ForwarderInfoService } from './forwarderInfo.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-show.component.html',
  providers: [UserService]
})
export class ForwarderInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  forwarderInfo = new ForwarderInfo();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
      this.route.params.subscribe((params: Params) => {
        this.forwarderInfoService.get(+params['id'], this.userObject).subscribe((forwarderInfo: ForwarderInfo) => {
          this.forwarderInfo = forwarderInfo;
        });
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.forwarderInfoService.destroy(this.forwarderInfo, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/forwarderInfo', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
