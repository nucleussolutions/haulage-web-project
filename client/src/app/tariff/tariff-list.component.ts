import {Component, OnInit} from '@angular/core';
import {TariffService} from './tariff.service';
import {Tariff} from './tariff';
import {UserService} from "../user.service";

@Component({
  selector: 'tariff-list',
  templateUrl: './tariff-list.component.html'
})
export class TariffListComponent implements OnInit {

  tariffList: Tariff[] = [];

  constructor(private tariffService: TariffService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().flatMap(userObject => this.tariffService.list(userObject)).subscribe((tariffList: Tariff[]) => {
      this.tariffList = tariffList;
    });
  }
}
