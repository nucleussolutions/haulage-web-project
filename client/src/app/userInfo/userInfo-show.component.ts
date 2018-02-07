import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserInfo} from './userInfo';
import {UserInfoService} from './userInfo.service';

@Component({
  selector: 'userInfo-persist',
  templateUrl: './userInfo-show.component.html'
})
export class UserInfoShowComponent implements OnInit {

  userInfo = new UserInfo();

  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userInfoService.get(+params['id']).subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.userInfoService.destroy(this.userInfo).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/userInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
