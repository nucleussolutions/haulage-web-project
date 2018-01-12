import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'company-persist',
  templateUrl: './company-show.component.html'
})
export class CompanyShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  company = new Company();

  private userObject: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if(params.hasOwnProperty('id')){
        return this.companyService.get(+params['id'], this.userObject);
      }else{
        throw 'param id not found'
      }
    }).subscribe((company: Company) => {
      this.company = company;
    });

  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.companyService.destroy(this.company, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/company', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
