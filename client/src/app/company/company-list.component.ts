import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  private token: string;

  private apiKey: string;

  constructor(private companyService: CompanyService, private cookieService: CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.companyService.list(this.token, this.apiKey).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    }, error => {
      this.modal.alert()
          .title('Error').message(error).open();
      //todo might need to navigate them back to login

    });
  }
}
