import {Component, OnDestroy, OnInit} from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';
import {Subscription} from "rxjs/Subscription";

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


  constructor(private companyService: CompanyService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.subscription = this.userService.getUser().flatMap(userObject => this.companyService.list(userObject)).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    }, error => {
      const dialog = this.modal.alert().isBlocking(true)
        .title('Error').message(error).open();

      dialog.then(value => {
        this.router.navigate(['/login']);
      });
    });
  }
}
