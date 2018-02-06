import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Company} from "../company/company";
import {CompanyService} from "../company/company.service";
import {Response} from "@angular/http";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.css']
})
export class CreateCompanyModalComponent implements OnInit {

  company = new Company();
  create = true;
  errors: any[];

  private userObject: any;

  constructor(public activeModal: NgbActiveModal, private companyService: CompanyService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(userObject => {
      this.userObject = userObject;
    });
  }

  save() {
    this.companyService.save(this.company, this.userObject).subscribe((company: Company) => {
      // this.router.navigate(['/company', 'show', company.id]);

    }, json => {
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
