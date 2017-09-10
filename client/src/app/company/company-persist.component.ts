import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Company} from './company';
import {CompanyService} from './company.service';
import {Response} from "@angular/http";


@Component({
  selector: 'company-persist',
  templateUrl: './company-persist.component.html'
})
export class CompanyPersistComponent implements OnInit {

  company = new Company();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.companyService.get(+params['id']).subscribe((company: Company) => {
          this.create = false;
          this.company = company;
        });
      }
    });
  }

  save() {
    this.companyService.save(this.company).subscribe((company: Company) => {
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
