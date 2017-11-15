import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DriverInfo } from './driverInfo';
import { DriverInfoService } from './driverInfo.service';
import { Response } from "@angular/http";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import {Modal} from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-persist.component.html',
})
export class DriverInfoPersistComponent implements OnInit {

  driverInfo = new DriverInfo();
  create = true;
  errors: any[];

  private subscription: Subscription;

  private userObject : any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router, private userService: UserService, private modal: Modal) {
    this.subscription = this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.driverInfoService.get(+params['id'], this.userObject).subscribe((driverInfo: DriverInfo) => {
          this.create = false;
          this.driverInfo = driverInfo;
        });
      }
    });
  }

  save() {
    this.driverInfoService.save(this.driverInfo, this.userObject).subscribe((driverInfo: DriverInfo) => {
      this.router.navigate(['/driverInfo', 'show', driverInfo.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
