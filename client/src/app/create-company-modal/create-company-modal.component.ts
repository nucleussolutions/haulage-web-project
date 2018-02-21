import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Company} from "../company/company";
import {CompanyService} from "../company/company.service";
import {Response} from "@angular/http";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.css'],
})
export class CreateCompanyModalComponent implements OnInit {

  company = new Company();
  create = true;
  errors: any[];

  @Input() userObject: any;

  private base64Encoded: string;

  constructor(public activeModal: NgbActiveModal, private companyService: CompanyService, private router: Router) {
  }

  ngOnInit() {
    this.company.country = 'Malaysia'
  }

  save() {
    this.company.companyImageBase64 = this.base64Encoded;
    this.companyService.save(this.company, this.userObject).subscribe((company: Company) => {
      this.activeModal.dismiss();
    }, json => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Encoded = myReader.result;
      console.log("Encoded file!");
    };
    myReader.readAsDataURL(file);
  }

}
