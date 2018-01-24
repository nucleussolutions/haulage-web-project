import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsignmentService } from './consignment.service';
import { Consignment } from './consignment';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from 'app/user.service';
import { PermissionService } from "../permission/permission.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Permission } from "../permission/permission";

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

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  permission: Permission;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private userService: UserService, private permissionService: PermissionService) {
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

      return this.consignmentService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

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

    // const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

    // dialog.result.then(result => {
    //   this.router.navigate(['/login']);
    // });
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
          console.log('json ' + JSON.stringify(json));
          this.consignmentList = json['data'];
          this.count = json['total'];
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
