import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html'
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private token : string;

  private apiKey : string;

  private userObject: any;

  constructor(private haulierInfoService: HaulierInfoService, private modal : Modal, private titleService: Title, private router: Router, private userService : UserService) {
    // this.token = this.cookieService.get('token');
    // this.apiKey = this.cookieService.get('apiKey');

    this.userService.loginState$.subscribe(loggedIn => {

    }, error => {

    });

    this.userService.getUser().subscribe(response => {
      this.userObject = response;
      this.token = this.userObject.token;
      this.apiKey = this.userObject.apiKey;
    }, error => {

    });

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
        // this.cookieService.removeAll();
        // this.navDrawerService.trigger(false);

        this.router.navigate(['/login']);
      });
    });
  }
}
