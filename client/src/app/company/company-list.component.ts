import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompanyService} from './company.service';
import {Company} from './company';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'app/user.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  providers: [UserService]
})
export class CompanyListComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  companyList: Company[] = [];

  private subscription: Subscription;

  private page: number = 1;


  constructor(private route: ActivatedRoute, private companyService: CompanyService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      let userObject = result[0];

      let params = result[1];
      return this.companyService.list(userObject);
    }).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    }, error => {
      const dialog = this.modal.alert().isBlocking(true)
        .title('Error').message(error).open();

      dialog.result.then(result => {
        this.router.navigate(['/login']);
      });
    });
  }
}
