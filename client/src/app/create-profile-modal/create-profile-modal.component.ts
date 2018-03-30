import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors,
  Validators
} from '@angular/forms';
import {Company} from "../company/company";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {UserInfoService} from "../userInfo/userInfo.service";
import {UserInfo} from "../userInfo/userInfo";
import {Permission} from "../permission/permission";
import {NgbActiveModal, NgbTypeaheadConfig} from "@ng-bootstrap/ng-bootstrap";
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
import {Subject} from "rxjs/Subject";
import {parse, format, AsYouType, isValidNumber} from 'libphonenumber-js'
import {malaysianPhoneNumberValidator} from "../validators/malaysian-phone-validator";

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.css'],
  providers: [NgbTypeaheadConfig] // add NgbTypeaheadConfig to the component providers
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

  showSuccessWindow: boolean = false;

  successMessage: string;

  //todo replace slow search in the future when elastic search is sorted out
  haulierCompanySearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.searchHauliers(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(json => {
                    console.log('search haulier companies');
                    this.companyList = json['searchResults'];
                    if (this.companyList.length > 0) {
                      return json['searchResults'].map(item => item.name);
                    } else {
                      this.isExistingCompanyNameValid = false;
                      console.log('isExistingCompanyNameValid ' + this.isExistingCompanyNameValid);
                    }
                  }));

  //FIXME remove when elastic search is sorted out
  haulierCompanySlowSearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => {
            if(term.length < 2){
              this.isExistingCompanyNameValid = false;
            }
            return Observable.of(term);
          })
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.getHauliers(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(companyList => {
                    console.log('search haulier companies');
                    this.companyList = companyList;
                    if (this.companyList.length > 0) {
                      return this.companyList.map(item => item.name);
                    } else {
                      this.isExistingCompanyNameValid = false;
                      console.log('isExistingCompanyNameValid ' + this.isExistingCompanyNameValid);
                    }
                  }));

  //todo replace slow search in the future when elastic search is sorted out
  forwarderCompanySearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.searchForwarders(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(json => {
                    console.log('search forwarder companies');
                    this.companyList = json['searchResults'];
                    if (this.companyList.length > 0) {
                      return json['searchResults'].map(item => item.name);
                    } else {
                      this.isExistingCompanyNameValid = false;
                      console.log('isExistingCompanyNameValid ' + this.isExistingCompanyNameValid);
                    }
                  }));

  //FIXME remove when elastic search is sorted out
  forwarderCompanySlowSearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => {
            if(term.length < 2){
              this.isExistingCompanyNameValid = false;
            }
            return Observable.of(term);
          })
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.getForwarders(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(companyList => {
                    console.log('search forwarder companies');
                    this.companyList = companyList;
                    if (this.companyList.length > 0) {
                      return this.companyList.map(item => item.name);
                    } else {
                      this.isExistingCompanyNameValid = false;
                      console.log('isExistingCompanyNameValid ' + this.isExistingCompanyNameValid);
                    }
                  }));

  errors: any[];
  isExistingCompanyNameValid: boolean = false;
  isCompanyRegNoValid: boolean = false;

  isCompanyCodeValid: boolean = false;

  isOfficePhoneValid: boolean = false;

  isYardPhoneValid: boolean = false;

  personalDetails: FormGroup;
  private subscription: Subscription;
  private base64Encoded: string;

  showSubmitButton: boolean = false;
  showNextButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal, private companyService: CompanyService, private permissionService: PermissionService, private pricingService: PricingService, private subscriptionService: MemberSubscriptionService, private transactionService: TransactionService, config: NgbTypeaheadConfig) {
    // customize default values of typeaheads used by this component tree
    config.showHint = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Encoded = myReader.result;
      console.log("Encoded file!");
    };
    myReader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.pricingService.listAll(this.userObject).subscribe(pricingList => {
      this.pricingList = pricingList;
      console.log('pricing list ' + this.pricingList);
    });

    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      // existingCompanyName: ['']
      usertype: new FormControl('Admin'),
      company: this.formBuilder.group({
        name: ['', Validators.required],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: new FormControl('Malaysia'),
        officePhone: ['', [Validators.required, this.officePhoneValidator()]],
        yardPhone: ['', [Validators.required, this.yardPhoneValidator()]],
        postalCode: ['', Validators.required],
        code: ['', Validators.required, this.companyCodeValidator()],
        companyImage: [''],
        registrationNo: ['', Validators.required, this.companyRegNoValidator()],
      }),
      pricing: ['', Validators.required]
    });
  }

  enableNewCompanyFields(enable: boolean) {
    if (enable) {
      this.personalDetails.get('company').enable();
      console.log('enable new company fields');
    } else {
      this.personalDetails.get('company').disable();
      console.log('disable new company fields');
    }
  }

  companyCodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let subject = new Subject<ValidationErrors | null>();
      console.log('control.value ' + control.value);
      Observable.of(control.value).debounceTime(200).distinctUntilChanged().switchMap(term => term.length > 2 ? this.companyService.getByCompanyCode(term, this.userObject) : []).subscribe(company => {
        if (company) {
          subject.next(company);
          console.log('company code invalid '+company.name);
          this.isCompanyCodeValid = false;
        } else {
          subject.next(null);
          console.log('company code valid');
          this.isCompanyCodeValid = true;
        }
      }, error => {
        subject.next(null);
        console.log('company code valid');
        this.isCompanyCodeValid = true;
      });
      return subject.asObservable();
    }
  }

  companyRegNoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let subject = new Subject<ValidationErrors | null>();
      console.log('control.value ' + control.value);
      Observable.of(control.value).debounceTime(200).distinctUntilChanged().switchMap(term => term.length > 2 ? this.companyService.getByRegistrationNo(term, this.userObject) : []).subscribe(value => {
        console.log('results found ' + JSON.stringify(value));
        subject.next({
          companyRegNoExists: true
        });
        this.isCompanyRegNoValid = false;
        console.log('this.isCompanyRegNoValid ' + this.isCompanyRegNoValid);
      }, error => {
        console.log('results not found');
        subject.next(null);
        this.isCompanyRegNoValid = true;
        console.log('this.isCompanyRegNoValid ' + this.isCompanyRegNoValid);
      });
      return subject.asObservable();
    }
  }

  officePhoneValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let valid = isValidNumber(control.value, 'MY');
      console.log('phone number valid '+valid);
      this.isOfficePhoneValid = valid;
      if(valid){
        return Observable.of(null);
      }else{
        return Observable.of({
          myPhoneValid: valid
        });
      }
    }
  }

  yardPhoneValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let valid = isValidNumber(control.value, 'MY');
      console.log('phone number valid '+valid);
      this.isYardPhoneValid = valid;
      if(valid){
        return Observable.of(null);
      }else{
        return Observable.of({
          myPhoneValid: valid
        });
      }
    }
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
    console.log('formData.value.usertype ' + formData.value.usertype);
    this.permission.authority = formData.value.usertype;

    // this.permission.company = this.company;
    // this.permission.userInfo = userInfo;
    console.log('saving permission '+this.permission);
    userInfo.permissions = [this.permission];
    console.log('saving userinfo '+userInfo);
    this.userInfoService.save(userInfo, this.userObject).subscribe(userInfo => {
      // this is supposed to submit the pricing and trigger a payment gateway as well
      if (this.personalDetails.get('usertype').value == 'Admin') {
        //todo check if the person is a staff or not
        if (this.permission.role == 'Owner') {
          this.subscribeToPlan(formData.value.pricing);
        } else {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
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
    this.showSubmitButton = false;
  }

  selectedCompany(value) {
    //todo search for whether the company permission actually exists already, then ask for approval from the owner of the company permission
    console.log('selected company ' + JSON.stringify(value));

    this.isExistingCompanyNameValid = true;
    console.log('isExistingCompanyNameValid ' + this.isExistingCompanyNameValid);

    this.permissionService.getByCompanyName(this.userObject, value.item).subscribe(permissions => {
      this.permission.role = 'Staff';
      this.permission.status = 'Pending Approval';
      this.permission.grantedBy = '';
      console.log('permission staff is set, and pending approval');

      // show submit button if owner
      if (this.permission.role == 'Owner') {
        this.showSubmitButton = false;
        this.showNextButton = true;
      } else {
        this.showSubmitButton = true;
        this.showNextButton = false;
      }

    }, error => {
      this.permission.role = 'Owner';
      this.permission.status = 'Approved';
      this.permission.grantedBy = this.userObject.uid;
      console.log('permission owner is set, and approved and granted by himself');

      // hide submit button
      this.showSubmitButton = false;
    });
  }

  onUserTypeChanged(evt) {
    let target = evt.target;
    console.log('onUserTypeChanged ' + target);

    //if the usertype is admin and owner. show the next button
    if (this.personalDetails.get('usertype').value == 'Admin' && this.permission.role == 'Owner') {
      this.showNextButton = true;
    } else {
      this.showNextButton = false;
      this.showSubmitButton = false;
    }

    this.isHaulier = this.personalDetails.get('usertype').value == 'Admin';
    console.log('this.isHaulier ' + this.isHaulier);
  }

  isHaulier: boolean = true;

  showSubscriptions(show: boolean) {
    //validate current fields for name and company

    //check if  the company is new under the user or not

    //if the company is new, then show the user some subscription options

    //then submit an api to subscribe and link to payment gateway

    //todo check if user type is a forwarder, then skip subscription

    this.showSubscriptionSelections = show;
    console.log('showSubs ' + this.showSubscriptionSelections);
    this.showSubmitButton = false;
  }

  saveCompany() {
    if(!this.personalDetails.get(['company', 'name']).valid){
      console.log('company name not valid');
      return
    }

    if(!this.isCompanyRegNoValid){
      console.log('company registration number not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'address1']).valid){
      console.log('company address1 not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'address2']).valid){
      console.log('company address2 not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'postalCode']).valid){
      console.log('company postalCode not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'city']).valid){
      console.log('company city not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'state']).valid){
      console.log('company state not valid');
      return
    }

    if(!this.personalDetails.get(['company', 'country']).valid){
      console.log('company country not valid');
      return
    }

    if(!this.isCompanyCodeValid){
      console.log('company code not valid');
      return
    }

    if(!this.isOfficePhoneValid){
      console.log('company office phone not valid');
      return
    }

    if(!this.isYardPhoneValid){
      console.log('company yard phone not valid');
      return
    }

    this.permission.role = 'Owner';
    this.permission.grantedBy = this.userObject.uid;
    this.permission.status = 'Approved';

    if(this.personalDetails.get('usertype').value == 'Admin'){
      this.permission.authority = 'Admin';
      this.showSubmitButton = true;
      this.showSubscriptionSelections = true;
    }else{
      console.log('submit details straight away since forwarder');
      this.permission.authority = 'Manager';
      //trigger submit details
      this.submitDetails(this.personalDetails);
    }
  }

  cancelNewCompany(){
    this.permission.role = 'Staff';
    this.permission.authority = 'Admin';
    this.permission.grantedBy = '';
    this.permission.status = 'Pending Approval';
    this.newCompany = false;
    this.showSubmitButton = false;
    this.showSubscriptionSelections = false;
  }

  subscribeToPlan(pricing: Pricing) {
    console.log('executing subscribe to plan ' + pricing);
    const memberSubscription = new MemberSubscription();
    memberSubscription.pricing = pricing;
    memberSubscription.monthlyRecurring = false;
    memberSubscription.userId = this.userObject.uid;
    this.showSpinnerProgress = true;

    if (environment.production) {

    }

    this.subscriptionService.save(memberSubscription, this.userObject).subscribe(memberSubscription => {
      if (environment.production) {
        //todo trigger payment gateway
      } else {
        // create dummy subscription and transaction
        let transaction = new Transaction();
        transaction.code = 'dummy';
        transaction.status = 'paid';
        transaction.subscription = memberSubscription;
        this.transactionService.save(transaction, this.userObject).subscribe(transaction => {
          window.location.reload();
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



