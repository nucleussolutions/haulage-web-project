import {Component, OnInit} from '@angular/core';
import {CompanyService} from './company.service';
import {Company} from './company';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.list().subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    });
  }
}
