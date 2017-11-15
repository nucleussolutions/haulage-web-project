import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import {Response} from "@angular/http";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'permission-persist',
  templateUrl: './permission-persist.component.html',
})
export class PermissionPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  permission = new Permission();
  create = true;
  errors: any[];

  private userObject : any;

  private subscription : Subscription;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private userService: UserService, private router: Router, private modal : Modal, private titleService: Title) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });

    this.titleService.setTitle('Create Permission');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.permissionService.get(+params['id'], this.userObject).subscribe((permission: Permission) => {
          this.create = false;
          this.permission = permission;
        });
      }
    });
  }

  save() {
    this.permissionService.save(this.permission, this.userObject).subscribe((permission: Permission) => {
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
