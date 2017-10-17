import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HaulierInfo } from './haulierInfo';
import { HaulierInfoService } from './haulierInfo.service';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-show.component.html'
})
export class HaulierInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  haulierInfo = new HaulierInfo();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.haulierInfoService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((haulierInfo: HaulierInfo) => {
        this.haulierInfo = haulierInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.haulierInfoService.destroy(this.haulierInfo, this.userObject.token, this.userObject.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/haulierInfo', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
