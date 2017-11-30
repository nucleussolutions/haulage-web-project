import {Component, OnDestroy, OnInit} from '@angular/core';
import {TariffService} from './tariff.service';
import {Tariff} from './tariff';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";

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

  constructor(private tariffService: TariffService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => this.tariffService.list(userObject)).subscribe((tariffList: Tariff[]) => {
      this.tariffList = tariffList;
    });
  }
}
