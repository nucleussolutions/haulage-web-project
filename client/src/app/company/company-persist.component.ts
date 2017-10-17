import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { Response } from "@angular/http";
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';


@Component({
  selector: 'company-persist',
  templateUrl: './company-persist.component.html'
})
export class CompanyPersistComponent implements OnInit {

  company = new Company();
  create = true;
  errors: any[];

  private userObject : any;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private userService: UserService) {
    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.companyService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((company: Company) => {
          this.create = false;
          this.company = company;
        });
      }
    });
  }

  save() {
    this.companyService.save(this.company, this.userObject.token, this.userObject.apiKey).subscribe((company: Company) => {
      this.router.navigate(['/company', 'show', company.id]);
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
