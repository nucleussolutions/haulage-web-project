import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-persist.component.html'
})
export class HaulierInfoPersistComponent implements OnInit {

  haulierInfo = new HaulierInfo();
  create = true;
  errors: any[];
  companyList: Company[];

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private companyService: CompanyService, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.companyService.list(this.token, this.apiKey).subscribe((companyList: Company[]) => { this.companyList = companyList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.haulierInfoService.get(+params['id'], this.token, this.apiKey).subscribe((haulierInfo: HaulierInfo) => {
          this.create = false;
          this.haulierInfo = haulierInfo;
        });
      }
    });
  }

  save() {
    this.haulierInfoService.save(this.haulierInfo, this.token, this.apiKey).subscribe((haulierInfo: HaulierInfo) => {
      this.router.navigate(['/haulierInfo', 'show', haulierInfo.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
