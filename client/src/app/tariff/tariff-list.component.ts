import {Component, OnDestroy, OnInit} from '@angular/core';
import {TariffService} from './tariff.service';
import {Tariff} from './tariff';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'tariff-list',
  templateUrl: './tariff-list.component.html'
})
export class TariffListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tariffList: Tariff[] = [];

  private subscription: Subscription;

  private page : number = 0;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  constructor(private route: ActivatedRoute, private tariffService: TariffService, private userService: UserService) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];
      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.tariffService.list(userObject, this.page);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;
      data.forEach(tariffDatum => {
        let tariff = new Tariff(tariffDatum.attributes);
        tariff.id = tariffDatum.id;
        this.tariffList.push(tariff);
      });
    });
  }
}
