import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import {Response} from "@angular/http";
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'permission-persist',
  templateUrl: './permission-persist.component.html'
})
export class PermissionPersistComponent implements OnInit {

  permission = new Permission();
  create = true;
  errors: any[];

  private token : string;

  private apiKey : string;


  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private router: Router, private modal : Modal, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.permissionService.get(+params['id'], this.token, this.apiKey).subscribe((permission: Permission) => {
          this.create = false;
          this.permission = permission;
        });
      }
    });
  }

  save() {
    this.permissionService.save(this.permission, this.token, this.apiKey).subscribe((permission: Permission) => {
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
