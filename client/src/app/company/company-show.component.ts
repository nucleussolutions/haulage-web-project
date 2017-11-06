import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';

@Component({
  selector: 'company-persist',
  templateUrl: './company-show.component.html'
})
export class CompanyShowComponent implements OnInit {

  company = new Company();

  private userObject: any;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private userService: UserService) {
    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.companyService.get(+params['id'], this.userObject).subscribe((company: Company) => {
        this.company = company;
      });
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
