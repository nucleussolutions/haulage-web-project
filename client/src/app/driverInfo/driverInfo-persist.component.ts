import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DriverInfo} from './driverInfo';
import {DriverInfoService} from './driverInfo.service';
import {Response} from "@angular/http";


@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-persist.component.html'
})
export class DriverInfoPersistComponent implements OnInit {

  driverInfo = new DriverInfo();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.driverInfoService.get(+params['id']).subscribe((driverInfo: DriverInfo) => {
          this.create = false;
          this.driverInfo = driverInfo;
        });
      }
    });
  }

  save() {
    this.driverInfoService.save(this.driverInfo).subscribe((driverInfo: DriverInfo) => {
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
