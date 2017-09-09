import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DriverInfo} from './driverInfo';
import {DriverInfoService} from './driverInfo.service';

@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-show.component.html'
})
export class DriverInfoShowComponent implements OnInit {

  driverInfo = new DriverInfo();

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.driverInfoService.get(+params['id']).subscribe((driverInfo: DriverInfo) => {
        this.driverInfo = driverInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.driverInfoService.destroy(this.driverInfo).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/driverInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
