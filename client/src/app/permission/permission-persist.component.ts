import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import {Response} from "@angular/http";


@Component({
  selector: 'permission-persist',
  templateUrl: './permission-persist.component.html'
})
export class PermissionPersistComponent implements OnInit {

  permission = new Permission();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.permissionService.get(+params['id']).subscribe((permission: Permission) => {
          this.create = false;
          this.permission = permission;
        });
      }
    });
  }

  save() {
    this.permissionService.save(this.permission).subscribe((permission: Permission) => {
      this.router.navigate(['/permission', 'show', permission.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
