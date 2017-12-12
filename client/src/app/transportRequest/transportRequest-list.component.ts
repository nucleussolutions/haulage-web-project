import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from '@angular/platform-browser';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {PermissionService} from 'app/permission/permission.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'transportRequest-list',
  templateUrl: './transportRequest-list.component.html',
})
export class TransportRequestListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transportRequestList: TransportRequest[] = [];

  private subscription: Subscription;

  private page: number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;


  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private userService: UserService, private modal: Modal, private titleService: Title) {
    this.titleService.setTitle('Transport Request List');
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.transportRequestService.list(userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;
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

      this.modal.alert().title('Error').message(message).open();
    });
  }

}
