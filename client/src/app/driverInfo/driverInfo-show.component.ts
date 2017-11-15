import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DriverInfo } from './driverInfo';
import { DriverInfoService } from './driverInfo.service';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';

@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-show.component.html',
})
export class DriverInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  driverInfo = new DriverInfo();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router, private modal : Modal, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.driverInfoService.get(+params['id'], this.userObject).subscribe((driverInfo: DriverInfo) => {
        this.driverInfo = driverInfo;
      }, error => {
        this.modal.alert().title('Error').message(error).open();
        //todo direct them back to login
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.driverInfoService.destroy(this.driverInfo, this.userObject).subscribe((success: boolean) => {
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
