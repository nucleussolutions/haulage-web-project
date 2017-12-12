import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";


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

  private page: number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  private count: number = 0;

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private modal: Modal, private titleService: Title, private userService: UserService) {
    this.titleService.setTitle('Forwarders');

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject  = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.forwarderInfoService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.forwarderInfoService.list(userObject, this.page);
    }).subscribe(json => {
      // this.forwarderInfoList = forwarderInfoList;
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

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
}
