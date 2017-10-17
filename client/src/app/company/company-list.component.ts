import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { Company } from './company';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList: Company[] = [];

  private userObject: any;


  constructor(private companyService: CompanyService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    }, error => {

    });


    this.companyService.list(this.userObject.token, this.userObject.apiKey).subscribe((companyList: Company[]) => {
      this.companyList = companyList;
    }, error => {
      const dialog = this.modal.alert().isBlocking(true)
        .title('Error').message(error).open();

      dialog.then(value => {
        this.router.navigate(['/login']);
      });
    });
  }
}
