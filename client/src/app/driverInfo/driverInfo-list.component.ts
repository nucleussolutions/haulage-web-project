import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriverInfoService } from './driverInfo.service';
import { DriverInfo } from './driverInfo';
import { Title } from "@angular/platform-browser";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'driverInfo-list',
  templateUrl: './driverInfo-list.component.html',
})
export class DriverInfoListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  driverInfoList: DriverInfo[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private titleService: Title, private modal: Modal, private userService: UserService, private router: Router) {
    this.titleService.setTitle('Drivers');
  }

  ngOnInit() {
    this.callDrivers();
  }

  callDrivers(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      //get count of drivers infos
      this.driverInfoService.count(this.userObject).subscribe(count => {
        this.count = count;
        console.log('driver info count ' + count);
      });

      return this.driverInfoService.list(this.userObject, this.offset);
    }).subscribe(json => {
      // this.driverInfoList = driverInfoList;
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      data.forEach(driverInfoDatum => {
        let driverInfo = new DriverInfo(driverInfoDatum.attributes);
        driverInfo.id = driverInfoDatum.id;
        this.driverInfoList.push(driverInfo);
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

      this.modal.alert().title('Error').message(message).open();
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/driverInfo', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.driverInfoService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<DriverInfo[]>([]))
        .subscribe(json => {
          this.driverInfoList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<DriverInfo[]>([]);
        });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callDrivers();
      });
    }
  }
}
