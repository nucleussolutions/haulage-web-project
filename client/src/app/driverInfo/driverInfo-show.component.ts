import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DriverInfo } from './driverInfo';
import { DriverInfoService } from './driverInfo.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'driverInfo-persist',
  templateUrl: './driverInfo-show.component.html',
})
export class DriverInfoShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  driverInfo = new DriverInfo();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private router: Router, private userService: UserService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.driverInfoService.get(+params['id'], this.userObject);
      }else{
        throw 'params id not found'
      }
    }).subscribe((driverInfo: DriverInfo) => {
      this.driverInfo = driverInfo;
    }, error => {
      let errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = error;
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
        let errorModalRef = this.modalService.open(GeneralModalComponent);
        errorModalRef.componentInstance.modalTitle = 'Error';
        errorModalRef.componentInstance.modalMessage = error;
      });
    }
  }

}
