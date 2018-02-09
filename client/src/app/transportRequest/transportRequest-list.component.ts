import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
// import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from '@angular/platform-browser';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {PermissionService} from 'app/permission/permission.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Permission} from "../permission/permission";


@Component({
  selector: 'transportRequest-list',
  templateUrl: './transportRequest-list.component.html',
})
export class TransportRequestListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  transportRequestList: TransportRequest[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  permissions: Permission[];

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private userService: UserService, private titleService: Title, private router: Router, private permissionService: PermissionService) {
    this.titleService.setTitle('Transport Request List');
  }

  ngOnInit() {
    this.callRFTs();
  }

  callRFTs(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      this.transportRequestService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      this.permissionService.getByUserId(this.userObject).subscribe(permissions => {
        this.permissions = permissions;
      });

      return this.transportRequestService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.transportRequestList = [];

      data.forEach(transportRequestDatum => {
        let transportRequest = new TransportRequest(transportRequestDatum.attributes);
        transportRequest.id = transportRequestDatum.id;
        this.transportRequestList.push(transportRequest);
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

      // this.modal.alert().title('Error').message(message).open();
    });

  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/transportRequest', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }

  search(term: string){
    if(term.length > 2){
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.transportRequestService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<TransportRequest[]>([]))
        .subscribe(transportRequestList => {
          this.transportRequestList = transportRequestList;
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<TransportRequest[]>([]);
        });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callRFTs();
      });
    }
  }
}
