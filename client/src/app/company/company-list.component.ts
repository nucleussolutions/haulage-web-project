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

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;

      //count
      this.companyService.count(userObject).subscribe(count => {
        this.count = count;
      });

      return this.companyService.list(userObject, this.offset);
    }).subscribe(json => {
      // this.companyList = companyList;
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.companyList = [];

      data.forEach(companyDatum => {
        let company = new Company(companyDatum.attributes);
        company.id = companyDatum.id;
        this.companyList.push(company);
      });


    }, error => {
      const dialog = this.modal.alert().isBlocking(true)
        .title('Error').message(error).open();

      dialog.result.then(result => {
        this.router.navigate(['/login']);
      });
    });
  }
}
