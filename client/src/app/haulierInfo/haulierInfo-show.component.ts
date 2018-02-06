import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-show.component.html',
})
export class HaulierInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  haulierInfo = new HaulierInfo();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.haulierInfoService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found';
      }
    }).subscribe((haulierInfo: HaulierInfo) => {
      this.haulierInfo = haulierInfo;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.haulierInfoService.destroy(this.haulierInfo, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/haulierInfo', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
