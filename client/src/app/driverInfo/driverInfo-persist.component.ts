import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DriverInfo} from './driverInfo';
import {DriverInfoService} from './driverInfo.service';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-persist.component.html',
})
export class DriverInfoPersistComponent implements OnInit {

  driverInfo = new DriverInfo();
  create = true;
  errors: any[];

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router, private userService: UserService) {


  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.driverInfoService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found, nothing to see here';
      }
    }).subscribe((driverInfo: DriverInfo) => {
      this.create = false;
      this.driverInfo = driverInfo;
    });
  }

  save() {
    this.driverInfoService.save(this.driverInfo, this.userObject).subscribe((driverInfo: DriverInfo) => {
      this.router.navigate(['/driverInfo', 'show', driverInfo.id]);
    }, (json) => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }
}
