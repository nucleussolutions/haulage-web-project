import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-persist.component.html'
})
export class ForwarderInfoPersistComponent implements OnInit {

  forwarderInfo = new ForwarderInfo();
  create = true;
  errors: any[];
  companyList: Company[];

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router, private companyService: CompanyService, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.companyService.list(this.token, this.apiKey).subscribe((companyList: Company[]) => { this.companyList = companyList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.forwarderInfoService.get(+params['id'], this.token, this.apiKey).subscribe((forwarderInfo: ForwarderInfo) => {
          this.create = false;
          this.forwarderInfo = forwarderInfo;
        });
      }
    });
  }

  save() {
    this.forwarderInfoService.save(this.forwarderInfo, this.token, this.apiKey).subscribe((forwarderInfo: ForwarderInfo) => {
      this.router.navigate(['/forwarderInfo', 'show', forwarderInfo.id]);
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
