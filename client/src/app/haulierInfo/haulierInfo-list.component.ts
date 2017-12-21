import { Component, OnDestroy, OnInit } from '@angular/core';
import { HaulierInfoService } from './haulierInfo.service';
import { HaulierInfo } from './haulierInfo';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/user.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html',
})
export class HaulierInfoListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  haulierInfoList: HaulierInfo[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService) {
    this.titleService.setTitle('Hauliers');
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.haulierInfoService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.haulierInfoService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.haulierInfoList = [];

      data.forEach(haulierInfoDatum => {
        let haulierInfo = new HaulierInfo(haulierInfoDatum.attributes);
        haulierInfo.id = haulierInfoDatum.id;
        this.haulierInfoList.push(haulierInfo);
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
      const dialog = this.modal.alert().title('Error').message(message).open();
      dialog.result.then(result => {
        //todo might need to navigate them back to login
        this.router.navigate(['/login']);
      });
    });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.haulierInfoService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<HaulierInfo[]>([]))
        .subscribe(haulierInfoList => {
          this.haulierInfoList = haulierInfoList;
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<HaulierInfo[]>([]);
        });
    }
  }

}
