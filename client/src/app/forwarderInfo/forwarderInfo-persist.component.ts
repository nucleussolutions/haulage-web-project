import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';
import {Response} from "@angular/http";
import {CompanyService} from '../company/company.service';
import {Company} from '../company/company';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";
import {UserInfo} from "../userInfo/userInfo";
import {UserInfoService} from "../userInfo/userInfo.service";
import {Permission} from "../permission/permission";
import {AngularFireAuth} from "angularfire2/auth";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateCompanyModalComponent} from "../create-company-modal/create-company-modal.component";

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-persist.component.html',
})
export class ForwarderInfoPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  forwarderInfo = new UserInfo();
  create = true;
  errors: any[];
  companyList: Company[];

  email: string;

  password: string;

  private subscription: Subscription;

  private userObject: any;

  companySearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.search(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(json => {
                    this.companyList = json['searchResults'];
                    if(this.companyList){
                      return json['searchResults'].map(item => item.name);
                    }else{
                      throw 'not found';
                    }
                  }));


  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService, private router: Router, private companyService: CompanyService, private userService: UserService, private firebaseAuth: AngularFireAuth, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.userInfoService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found. nothing to see here'
      }

    }).subscribe((forwarderInfo: UserInfo) => {
      this.create = false;
      this.forwarderInfo = forwarderInfo;
    });
  }

  save() {
    if(this.create){
      const permission = new Permission();
      permission.authority = 'Manager';
      permission.userInfo = this.forwarderInfo;
      permission.email = this.email;
      permission.grantedBy = this.userObject.uid;
      this.forwarderInfo.permissions.push(permission);
    }
    this.userInfoService.save(this.forwarderInfo, this.userObject).subscribe((forwarderInfo: ForwarderInfo) => {
      this.firebaseAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(value => {
        console.log('user account created. User may proceed to login and fill in user details');
      });
      this.router.navigate(['/forwarderInfo', 'show', forwarderInfo.id]);
    }, json => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }

  addCompany(){
    const createCompanyModalRef = this.modalService.open(CreateCompanyModalComponent, {
      size: 'lg'
    });
    createCompanyModalRef.componentInstance.userObject = this.userObject;
  }

  addForwarder(){

  }
}
