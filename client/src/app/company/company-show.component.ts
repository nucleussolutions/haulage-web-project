import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'company-persist',
  templateUrl: './company-show.component.html'
})
export class CompanyShowComponent implements OnInit {

  company = new Company();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.companyService.get(+params['id'], this.token, this.apiKey).subscribe((company: Company) => {
        this.company = company;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.companyService.destroy(this.company, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/company', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
