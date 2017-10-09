import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DriverInfo } from './driverInfo';
import { DriverInfoService } from './driverInfo.service';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-show.component.html'
})
export class DriverInfoShowComponent implements OnInit {

  driverInfo = new DriverInfo();

  private token: string;

  private apiKey: string;

  private expirationTime : any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router, private cookieService: CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
    this.expirationTime = this.cookieService.get('expirationTime');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.driverInfoService.get(+params['id'], this.token, this.apiKey).subscribe((driverInfo: DriverInfo) => {
        this.driverInfo = driverInfo;
      }, error => {
        this.modal.alert().title('Error').message(error).open();
        //todo direct them back to login
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.driverInfoService.destroy(this.driverInfo, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/driverInfo', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
          this.modal.alert().title('Error').message(error).open();
          //todo direct them back to login
      });
    }
  }

}
