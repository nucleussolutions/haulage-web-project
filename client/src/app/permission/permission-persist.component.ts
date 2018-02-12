import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import {Title} from "@angular/platform-browser";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {UserInfo} from "../userInfo/userInfo";


@Component({
  selector: 'permission-persist',
  templateUrl: './permission-persist.component.html',
})
export class PermissionPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  permission = new Permission();
  create = true;
  errors: any[];

  private userObject: any;

  private subscription: Subscription;

  password: string;

  name: string;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private userService: UserService, private router: Router, private titleService: Title, private firebaseAuth: AngularFireAuth) {
    this.titleService.setTitle('Create Permission');
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.permissionService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found. nothing to see here'
      }

    }).subscribe((permission: Permission) => {
      this.create = false;
      this.permission = permission;
    });
  }

  save() {
    if(this.create){
      this.permission.grantedBy = this.userObject.uid;
      this.permission.userInfo = new UserInfo();
      this.permission.userInfo.userId = this.userObject.uid;
    }
    this.permission.userInfo.name = this.name;

    this.permissionService.save(this.permission, this.userObject).subscribe((permission: Permission) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(permission.email, this.password).then(value => {
        console.log('user account created. User may proceed to login and fill in user details');
      });
      this.router.navigate(['/permission', 'show', permission.id]);
    }, json => {
      console.log('json error '+JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors '+JSON.stringify(this.errors));
    });
  }
}
