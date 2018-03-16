import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
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
import {Subject} from "rxjs/Subject";
import { parse, format, AsYouType } from 'libphonenumber-js'

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

  showSuccessWindow : boolean = false;

  successMessage: string;

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
                    if (this.companyList.length > 0) {
                      return json['searchResults'].map(item => item.name);
                    } else {
                      //todo show some error message on the typeahead field for company
                      // throw 'not found';
                      this.isExistingCompanyNameValid = false;
                      console.log('isExistingCompanyNameValid '+this.isExistingCompanyNameValid);
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

  isExistingCompanyNameValid: boolean = false;

  isCompanyRegNoValid: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal, private companyService: CompanyService, private permissionService: PermissionService, private pricingService: PricingService, private subscriptionService: MemberSubscriptionService, private transactionService: TransactionService) {

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
        officePhone: ['', Validators.required],
        yardPhone: ['', Validators.required],
        postalCode: ['', Validators.required],
        code: ['', Validators.required],
        companyImage: [''],
        registrationNo: ['', Validators.required, this.companyRegNoValidator(this.userObject, this.companyService)],
      }),
      pricing: ['', Validators.required]
    });
  }

  companyRegNoValidator(userObject: any, companyService: CompanyService) : AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let subject = new Subject<ValidationErrors | null>();
      console.log('companyRegNoValidator userObject '+JSON.stringify(userObject));
      console.log('control.value '+control.value);
      if(control.value.length > 2){
        companyService.getByRegistrationNo(control.value, userObject).subscribe(value => {
          console.log('results found '+JSON.stringify(value));
          subject.next({
            message: 'company registration number exists'
          });
          this.isCompanyRegNoValid = false;
          console.log('this.isCompanyRegNoValid '+this.isCompanyRegNoValid);
        }, error => {
          console.log('results not found');
          subject.next(null);
          this.isCompanyRegNoValid = true;
          console.log('this.isCompanyRegNoValid '+this.isCompanyRegNoValid);
        });
      }
      return subject.asObservable();
    }
  }
  /**
   * todo this will come in when client side validation needs it
   * @param event
   */
  onCompanyRegNoChanged(event: any) {
    console.log('event target value ' + event.target.value);
    Observable.of(event.target.value).flatMap(value => {
      return Observable.of(value).debounceTime(200).distinctUntilChanged().switchMap(value => value.length < 2 && this.userObject ? null : this.companyService.searchByRegNo(value, this.userObject));
    }).subscribe(json => {
      this.companyList = json['searchResults'];
      if (this.companyList) {
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
    console.log('formData.value.usertype ' + formData.value.usertype);
    this.permission.authority = formData.value.usertype;
    userInfo.permissions = [this.permission];

    this.userInfoService.save(userInfo, this.userObject).subscribe(userInfo => {
      // this.activeModal.dismiss();
      //dismiss modal and reload the whole screen
      // window.location.reload();

      //todo this is supposed to submit the pricing and trigger a payment gateway as well
      this.subscribeToPlan(formData.value.pricing);
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
    //todo search for whether the company permission actually exists already, then ask for approval from the owner of the company permission
    console.log('selected company ' + JSON.stringify(value));

    this.isExistingCompanyNameValid = true;
    console.log('isExistingCompanyNameValid '+this.isExistingCompanyNameValid);

    this.permissionService.getByCompanyName(this.userObject, value.item).subscribe(permissions => {
      this.permission.role = 'Staff';
      this.permission.status = 'Pending Approval';
      this.permission.grantedBy = '';
      console.log('permission staff is set, and pending approval');
    }, error => {
      this.permission.role = 'Owner';
      this.permission.status = 'Approved';
      this.permission.grantedBy = this.userObject.uid;
      console.log('permission owner is set, and approved and granted by himself');
    });
  }

  showSubscriptions(show: boolean) {
    //validate current fields for name and company

    //check if  the company is new under the user or not

    //if the company is new, then show the user some subscription options

    //then submit an api to subscribe and link to payment gateway

    this.showSubscriptionSelections = show;
    console.log('showSubs ' + this.showSubscriptionSelections);
  }

  subscribeToPlan(pricing: Pricing) {
    console.log('executing subscribe to plan '+pricing);
    const memberSubscription = new MemberSubscription();
    memberSubscription.pricing = pricing;
    memberSubscription.monthlyRecurring = false;
    memberSubscription.userId = this.userObject.uid;
    this.showSpinnerProgress = true;

    if (environment.production) {

    }

    this.subscriptionService.save(memberSubscription, this.userObject).subscribe(memberSubscription => {
      //todo close modal dialog perhaps
      if (environment.production) {
        //todo trigger payment gateway
      } else {
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



