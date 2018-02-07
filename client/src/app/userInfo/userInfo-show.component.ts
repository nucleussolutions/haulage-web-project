import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserInfo} from './userInfo';
import {UserInfoService} from './userInfo.service';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'userInfo-persist',
  templateUrl: './userInfo-show.component.html'
})
export class UserInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  userInfo = new UserInfo();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(),this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.userInfoService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found'
      }
    }).subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
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
