import {Component, Input, OnInit} from '@angular/core';
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

  @Input() userObject: any;

  constructor(public activeModal: NgbActiveModal, private companyService: CompanyService, private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    this.companyService.save(this.company, this.userObject).subscribe((company: Company) => {
      this.activeModal.dismiss();
    }, json => {
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
