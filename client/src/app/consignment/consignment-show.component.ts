import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import * as jsPDF from 'jspdf';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-show.component.html',
})
export class ConsignmentShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  consignment = new Consignment();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.consignmentService.get(+params['id'], this.userObject);
      }else {
        throw 'param id not found'
      }
    }).subscribe((consignment: Consignment) => {
      this.consignment = consignment;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.consignmentService.destroy(this.consignment, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/consignment', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

  printConsignmentNote(){
    //todo send consignment details for the backend to produce a consignment note in the form of pdf

  }

}
