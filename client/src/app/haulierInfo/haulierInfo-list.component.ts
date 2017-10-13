import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import { NavDrawerService } from 'app/nav-drawer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html'
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private token : string;

  private apiKey : string;

  constructor(private haulierInfoService: HaulierInfoService, private cookieService : CookieService, private modal : Modal, private titleService: Title, private router: Router, private navDrawerService : NavDrawerService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
    this.titleService.setTitle('Hauliers');
  }

  ngOnInit() {
    this.haulierInfoService.list(this.token, this.apiKey).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    }, error => {

      let message;

      if(error.status === 401){
        message = 'Unauthorized';
      }else if(error.status === 500){
        message = 'Internal server error';
      }else if(error.status === 400){
        message = 'Bad request';
      }

      const dialog = this.modal.alert().title('Error').message(message).open();

      dialog.then(value => {
        //todo might need to navigate them back to login
        this.cookieService.removeAll();
        this.navDrawerService.trigger(false);
        this.router.navigate(['/login']);
      });
    });
  }
}
