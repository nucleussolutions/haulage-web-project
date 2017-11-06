import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Permission } from './permission';
import { PermissionService } from './permission.service';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { UserService } from 'app/user.service';

@Component({
  selector: 'permission-persist',
  templateUrl: './permission-show.component.html',
  providers: [UserService]
})
export class PermissionShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");

  }

  permission = new Permission();

  private userObject : any;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router, private userService: UserService, private modal: Modal) {
    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.permissionService.get(+params['id'], this.userObject).subscribe((permission: Permission) => {
        this.permission = permission;
      });
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.permissionService.destroy(this.permission, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/permission', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
        this.modal.alert().title('Error').message(error).open();
      });
    }
  }

}
