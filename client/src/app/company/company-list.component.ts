import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  private token: string;

  private apiKey: string;

  constructor(private companyService: CompanyService, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.companyService.list(this.token, this.apiKey).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    });
  }
}
