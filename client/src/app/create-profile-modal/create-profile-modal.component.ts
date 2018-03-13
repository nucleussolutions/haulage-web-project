import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from "../company/company";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {UserInfoService} from "../userInfo/userInfo.service";
import {UserInfo} from "../userInfo/userInfo";
import {Permission} from "../permission/permission";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {CompanyService} from "../company/company.service";
import {PermissionService} from "../permission/permission.service";
import {PricingService} from "../pricing/pricing.service";
import {Pricing} from "../pricing/pricing";
import {MemberSubscriptionService} from "../memberSubscription/memberSubscription.service";
import {MemberSubscription} from "../memberSubscription/memberSubscription";
import {environment} from "../../environments/environment";
import {Transaction} from "../transaction/transaction";
import {TransactionService} from "../transaction/transaction.service";
import {companyRegNoValidator} from "../company-regno-validator";

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

  showSpinnerProgress: boolean = false;

  //show pricing list on the modal itself
  pricingList: Pricing[];

  pricing: Pricing;

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



  private personalDetails: FormGroup;

  private subscription: Subscription;

  private base64Encoded: string;

  changeListener($event): void {
    this.readThis($event.target);
  }

  errors: any[];

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Encoded = myReader.result;
      console.log("Encoded file!");
    };
    myReader.readAsDataURL(file);
  }

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal, private companyService: CompanyService, private permissionService: PermissionService, private pricingService: PricingService, private subscriptionService: MemberSubscriptionService, private transactionService: TransactionService) {

  }

  ngOnInit(): void {
    this.pricingService.listAll(this.userObject).subscribe(pricingList => {
      this.pricingList = pricingList;
      console.log('pricing list '+this.pricingList);
    });

    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      usertype: new FormControl('Admin'),
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
        registrationNo: ['', Validators.required, companyRegNoValidator(this.userObject, this.companyService)],
      })
    });
  }

  /**
   * todo this will come in when client side validation needs it
   * @param event
   */
  onCompanyRegNoChanged(event: any){
    console.log('event target value '+event.target.value);
    Observable.of(event.target.value).flatMap(value => {
        return Observable.of(value).debounceTime(200).distinctUntilChanged().switchMap(value => value.length < 2 && this.userObject ? null : this.companyService.searchByRegNo(value, this.userObject));
    }).subscribe(json => {
        this.companyList = json['searchResults'];
        if(this.companyList){
          //todo alert the registration no field that it must be unique

          //todo add has-danger to form-group

          //todo add is-invalid class to form-control of the registration number input

          //todo make
        }
    });
  }

  submitDetails(formData) {
    // let loadingSpinner = document.getElementById('loading-spinner');
    if (!this.company) {
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

    this.permission.email = this.userObject.email;

    //user permission will always be haulier since create profile is for the haulier
    console.log('formData.value.usertype '+formData.value.usertype);
    this.permission.authority = formData.value.usertype;
    userInfo.permissions = [this.permission];

    this.userInfoService.save(userInfo, this.userObject).subscribe(userInfo => {
      // this.activeModal.dismiss();
      //dismiss modal and reload the whole screen
      // window.location.reload();

      //todo this is supposed to submit the pricing and trigger a payment gateway as well
      this.subscribeToPlan(this.pricing);
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

  addCompany() {
    this.newCompany = true;
  }

  selectedCompany(value) {
    this.company = value;

    //todo search for whether the company permission actually exists already, then ask for approval from the owner of the company permission
    console.log('selected company '+JSON.stringify(value));
    this.permissionService.getByCompany(this.userObject, this.company.id).subscribe(permission => {
      //maybe send an email to the owner of the permission so that this user can be approved
      this.permission.role = 'Staff';
    }, error => {
      //if the company permission doesnt exist, then proceed to create a new permission and assign owner role
      this.permission.role = 'Owner';
      this.permission.status = 'Approved';
      this.permission.grantedBy = this.userObject.uid;
    });

  }

  showSubscriptions(show: boolean) {
    //validate current fields for name and company

    //check if  the company is new under the user or not

    //if the company is new, then show the user some subscription options

    //then submit an api to subscribe and link to payment gateway

    this.showSubscriptionSelections = show;
    console.log('showSubs '+this.showSubscriptionSelections);
  }

  subscribeToPlan(pricing: Pricing){
    console.log('executing subscribe to plan');
    const memberSubscription = new MemberSubscription();
    memberSubscription.pricing = pricing;
    memberSubscription.monthlyRecurring = false;
    memberSubscription.userId = this.userObject.uid;
    this.showSpinnerProgress = true;

    if(environment.production){

    }

    this.subscriptionService.save(memberSubscription, this.userObject).subscribe(memberSubscription => {
      //todo close modal dialog perhaps
      if(environment.production){
        //todo trigger payment gateway
      }else{
        //todo create dummy subscription and transaction
        let transaction = new Transaction();
        transaction.code = 'dummy';
        transaction.status = 'paid';
        transaction.subscription = memberSubscription;
        this.transactionService.save(transaction, this.userObject).subscribe(transaction => {
          this.activeModal.dismiss();
        });
      }
      this.showSpinnerProgress = false;
    }, json => {
      //show some relevant error messages on the modal itself without opening a new modal
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));

      this.showSpinnerProgress = false;
    });
  }
}



