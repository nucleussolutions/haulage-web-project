import { Component, OnDestroy, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/user.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  permissionList: Permission[] = [];

  private subscription: Subscription;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router, private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.callPermissions();
  }

  callPermissions(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;


      this.permissionService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.permissionService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];

      this.permissionList = [];

      data.forEach(permissionDatum => {
        let permission = new Permission(permissionDatum.attributes);
        permission.id = permissionDatum.id;
        this.permissionList.push(permission);
      });

    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      let modalRef = this.modalService.open(ErrorModalComponent);
      modalRef.componentInstance.modalTitle = 'Error';
      modalRef.componentInstance.modalMessage = message;
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/permission', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.permissionService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Permission[]>([]))
        .subscribe(json => {
          this.permissionList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Permission[]>([]);
        });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callPermissions();
      });
    }
  }
}
