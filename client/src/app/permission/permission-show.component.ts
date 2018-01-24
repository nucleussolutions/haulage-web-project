import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Permission } from './permission';
import { PermissionService } from './permission.service';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'permission-persist',
  templateUrl: './permission-show.component.html',
})
export class PermissionShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  permission = new Permission();

  private userObject : any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router, private userService: UserService) {
    
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

        this.userObject = result[0];

        let params = result[1];

        if (params.hasOwnProperty('id')) {
          return this.permissionService.get(+params['id'], this.userObject);    
        }else{ 
          throw 'params id not found';
        }
    }).subscribe((permission: Permission) => {
      this.permission = permission;
    }, error => {
      let message;
      if (error.status == 400) {
        message = 'Bad request';
      } else if (error.status == 500) {
        message = 'Internal server error';
      } else if (error.status == 404) {
        message = 'Not found';
      }

      // this.modal.alert().title('Error').message(message).open();
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
        // this.modal.alert().title('Error').message(error).open();
      });
    }
  }

}
