import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'permission-persist',
  templateUrl: './permission-show.component.html'
})
export class PermissionShowComponent implements OnInit {

  permission = new Permission();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router, private cookieService : CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.permissionService.get(+params['id'], this.token, this.apiKey).subscribe((permission: Permission) => {
        this.permission = permission;
      });
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.permissionService.destroy(this.permission, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/permission','list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
        this.modal.alert().title('Error').message(error).open();
      });
    }
  }

}
