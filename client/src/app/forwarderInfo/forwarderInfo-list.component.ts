import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForwarderInfoService } from './forwarderInfo.service';
import { ForwarderInfo } from './forwarderInfo';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'forwarderInfo-list',
  templateUrl: './forwarderInfo-list.component.html',
})
export class ForwarderInfoListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  forwarderInfoList: ForwarderInfo[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;


  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private modal: Modal, private titleService: Title, private userService: UserService, private router: Router) {
    this.titleService.setTitle('Forwarders');

  }

  ngOnInit() {
    this.callForwarders();
  }

  callForwarders(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.forwarderInfoService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.forwarderInfoService.list(this.userObject, this.offset);
    }).subscribe(json => {
      // this.forwarderInfoList = forwarderInfoList;
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.forwarderInfoList = [];

      data.forEach(forwarderInfoDatum => {
        let forwarderInfo = new ForwarderInfo(forwarderInfoDatum.attributes);
        forwarderInfo.id = forwarderInfoDatum.id;
        this.forwarderInfoList.push(forwarderInfo);
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
    this.router.navigate(['/forwarderInfo', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.forwarderInfoService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<ForwarderInfo[]>([]))
        .subscribe(json => {
          this.forwarderInfoList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<ForwarderInfo[]>([]);
        });
    }else{
      Observable.of(term).debounceTime(300).distinctUntilChanged().subscribe(() => {
        this.callForwarders();
      });
    }
  }
}
