import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {Company} from "../company/company";
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {UserInfoService} from "../userInfo/userInfo.service";
import {UserInfo} from "../userInfo/userInfo";
import {Permission} from "../permission/permission";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {CompanyService} from "../company/company.service";
import {CreateCompanyModalComponent} from "../create-company-modal/create-company-modal.component";
import {PermissionService} from "../permission/permission.service";
import {PricingService} from "../pricing/pricing.service";

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.css'],
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {

  @Input() userObject: any;

  companyList: Company[];

  company: Company;

  newCompany: boolean = false;

  permission: Permission = new Permission();

  showSubscriptionSelections: boolean = false;

  showSpinnerProgress : boolean = false;

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
                    if (this.companyList) {
                      return json['searchResults'].map(item => item.name);
                    } else {
                      throw 'not found';
                    }
                  }));

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.pricingService.list()
  }

  private personalDetails: FormGroup;

  private subscription: Subscription;

  private base64Encoded: string;

  changeListener($event) : void {
    this.readThis($event.target);
  }

  errors: any[];

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Encoded = myReader.result;
      console.log("Encoded file!");
    };
    myReader.readAsDataURL(file);
  }

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal, private companyService: CompanyService, private permissionService: PermissionService, private pricingService: PricingService) {

    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      company: this.formBuilder.group({
        name: ['', Validators.required],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: new FormControl('Malaysia'),
        officePhone: ['', Validators.required],
        yardPhone: ['', Validators.required],
        postalCode: ['', Validators.required],
        code: ['', Validators.required],
        companyImage: [''],
        registrationNo: ['', Validators.required],
      })
    });
  }

  submitDetails(formData) {
    //todo perhaps check the uniqueness of the user id first then save
    // let loadingSpinner = document.getElementById('loading-spinner');
    if(!this.company){
      this.company = new Company();
      this.company.name = formData.value.company.name;
      this.company.address1 = formData.value.company.address1;
      this.company.address2 = formData.value.company.address2;
      this.company.city = formData.value.company.city;
      this.company.state = formData.value.company.state;
      this.company.country = formData.value.company.country;
      this.company.registrationNo = formData.value.company.registrationNo;
      this.company.code = formData.value.company.code;
      this.company.yardPhone = formData.value.company.yardPhone;
      this.company.officePhone = formData.value.company.officePhone;
      this.company.email = this.userObject.email;
      this.company.postalCode = formData.value.company.postalCode;
      //todo convert companyImage to base64 string

      this.company.companyImageBase64 = this.base64Encoded;
    }

    let userInfo = new UserInfo();
    userInfo.name = formData.value.name;
    userInfo.userId = this.userObject.uid;
    userInfo.company = this.company;

    this.permission.email = this.userObject.email;

    //user permission will always be haulier since create profile is for the haulier
    this.permission.authority = 'Admin';
    userInfo.permissions = [this.permission];


    this.userInfoService.save(userInfo, this.userObject).subscribe(userInfo => {
      this.activeModal.dismiss();
      //dismiss modal and reload the whole screen
      window.location.reload();
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
    this.newCompany = true;
  }

  selectedCompany(value){
    this.company = value;

    //todo search for whether the company permission actually exists already, then ask for approval from the owner of the company permission
    this.permissionService.getByCompany(this.userObject, this.company.id).subscribe(permission => {
      //maybe send an email to the owner of the permission so that this user can be approved
      this.permission.role = 'Staff';
    }, error => {
      //if the company permission doesnt exist, then proceed to create a new permission and assign owner role
      this.permission.role = 'Owner';
    });

  }
}



