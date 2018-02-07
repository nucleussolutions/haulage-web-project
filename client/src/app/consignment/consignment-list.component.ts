import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsignmentService } from './consignment.service';
import { Consignment } from './consignment';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from 'app/user.service';
import { PermissionService } from "../permission/permission.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Permission } from "../permission/permission";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html',

})
export class ConsignmentListComponent implements OnInit {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  consignmentList: Consignment[] = [];

  private page: number = 1;

  private subscription: Subscription;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  permission: Permission;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private userService: UserService, private permissionService: PermissionService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.callConsignments();
  }

  callConsignments() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];
      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      //count
      this.consignmentService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      this.permissionService.getByUserId(this.userObject).subscribe(permission => {
        this.permission = permission;
      });
      console.log('executing paged consignment list');
      return this.consignmentService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];

      this.consignmentList = [];

      data.forEach(consignmentDatum => {
        let consignment = new Consignment(consignmentDatum.attributes);
        consignment.id = consignmentDatum.id;
        this.consignmentList.push(consignment);
      });

    }, error => {
      this.handleError(error);
    });
  }

  private handleError(error) {
    let message;

    if (error.status === 401) {
      message = 'Unauthorized';
    } else if (error.status === 500) {
      message = "Internal server error";
    } else if (error.status === 400) {
      message = 'Bad request';
    }

    let modalRef = this.modalService.open(GeneralModalComponent);
    modalRef.componentInstance.modalTitle = 'Error';
    modalRef.componentInstance.modalMessage = message;
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/consignment', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.consignmentService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Consignment[]>([]))
        .subscribe(json => {
          this.consignmentList = json['searchResults'];

        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Consignment[]>([]);
        });
    } else {
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callConsignments();
      });
    }
  }
}
