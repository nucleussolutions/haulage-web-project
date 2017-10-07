import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';

@Component({
  selector: 'permission-persist',
  templateUrl: './permission-show.component.html'
})
export class PermissionShowComponent implements OnInit {

  permission = new Permission();

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.permissionService.get(+params['id']).subscribe((permission: Permission) => {
        this.permission = permission;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.permissionService.destroy(this.permission).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/permission','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
