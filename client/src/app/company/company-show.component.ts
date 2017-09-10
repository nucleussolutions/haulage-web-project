import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Company} from './company';
import {CompanyService} from './company.service';

@Component({
  selector: 'company-persist',
  templateUrl: './company-show.component.html'
})
export class CompanyShowComponent implements OnInit {

  company = new Company();

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.companyService.get(+params['id']).subscribe((company: Company) => {
        this.company = company;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.companyService.destroy(this.company).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/company','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
