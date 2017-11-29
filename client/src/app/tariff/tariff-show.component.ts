import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Tariff} from './tariff';
import {TariffService} from './tariff.service';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'tariff-persist',
  templateUrl: './tariff-show.component.html'
})
export class TariffShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tariff = new Tariff();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private tariffService: TariffService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.tariffService.get(+params['id'], this.userObject);
    }).subscribe((tariff: Tariff) => {
      this.tariff = tariff;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.tariffService.destroy(this.tariff, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/tariff', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
