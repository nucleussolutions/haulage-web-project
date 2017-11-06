import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-persist.component.html',
  providers: [UserService]
})
export class ForwarderInfoPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  forwarderInfo = new ForwarderInfo();
  create = true;
  errors: any[];
  companyList: Company[];

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router, private companyService: CompanyService, private userService : UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.companyService.list(this.userObject).subscribe((companyList: Company[]) => { this.companyList = companyList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.forwarderInfoService.get(+params['id'], this.userObject).subscribe((forwarderInfo: ForwarderInfo) => {
          this.create = false;
          this.forwarderInfo = forwarderInfo;
        });
      }
    });
  }

  save() {
    this.forwarderInfoService.save(this.forwarderInfo, this.userObject).subscribe((forwarderInfo: ForwarderInfo) => {
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
