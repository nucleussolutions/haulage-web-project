import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from '@angular/router';
import { NavDrawerService } from 'app/nav-drawer.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  private token: string;

  private apiKey: string;

  constructor(private companyService: CompanyService, private cookieService: CookieService, private modal: Modal, private router: Router, private navDrawerService: NavDrawerService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.companyService.list(this.token, this.apiKey).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    }, error => {
      const dialog = this.modal.alert().isBlocking(true)
        .title('Error').message(error).open();

      dialog.then(value => {
        //todo might need to navigate them back to login
        this.cookieService.removeAll();
        this.navDrawerService.trigger(false);
        this.router.navigate(['/login']);
      });
    });
  }
}
