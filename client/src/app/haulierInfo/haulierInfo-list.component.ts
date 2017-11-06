import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';
import {UserService} from 'app/user.service';


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html',
  providers: [UserService]
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private userObject: any;

  constructor(private haulierInfoService: HaulierInfoService, private modal: Modal, private titleService: Title, private router: Router, private userService: UserService) {
    this.titleService.setTitle('Hauliers');
  }

  ngOnInit() {
    this.userService.getUser().flatMap(userObject => this.haulierInfoService.list(this.userObject)).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    }, error => {
      let message;
      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }
      const dialog = this.modal.alert().title('Error').message(message).open();
      dialog.then(value => {
        //todo might need to navigate them back to login
        this.router.navigate(['/login']);
      });
    });
  }
}
