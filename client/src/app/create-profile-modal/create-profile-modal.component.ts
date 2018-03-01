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

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.css'],
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {

  @Input() userObject: any;

  companyList: Company[];

  company: Company;

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

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal, private companyService: CompanyService, private modalService: NgbModal) {

    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress1: ['', Validators.required],
      companyAddress2: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyState: ['', Validators.required],
      companyCountry: new FormControl('Malaysia'),
      companyOfficePhone: ['', Validators.required],
      companyYardPhone: ['', Validators.required],
      companyPostalCode: ['', Validators.required],
      companyCode: ['', Validators.required],
      companyImage: [''],
      companyRegNo: ['', Validators.required],
    });
  }

  submitDetails(formData) {
    //todo perhaps check the uniqueness of the user id first then save
    // let loadingSpinner = document.getElementById('loading-spinner');
    let company = new Company();
    company.name = formData.value.companyName;
    company.address1 = formData.value.companyAddress1;
    company.address2 = formData.value.companyAddress2;
    company.city = formData.value.companyCity;
    company.state = formData.value.companyState;
    company.country = formData.value.companyCountry;
    company.registrationNo = formData.value.companyRegNo;
    company.code = formData.value.companyCode;
    company.yardPhone = formData.value.companyYardPhone;
    company.officePhone = formData.value.companyOfficePhone;
    company.email = this.userObject.email;
    company.postalCode = formData.value.companyPostalCode;
    //todo convert companyImage to base64 string

    company.companyImageBase64 = this.base64Encoded;
    // company.companyImgUrl = this.base64Encoded;
    //upload photos to amazon s3 or firebase storage

    let userInfo = new UserInfo();
    userInfo.name = formData.value.name;
    userInfo.userId = this.userObject.uid;
    userInfo.company = company;

    let permission = new Permission();
    permission.email = this.userObject.email;

    //user permission will always be haulier since create profile is for the haulier
    permission.authority = 'Admin';
    userInfo.permissions = [permission];

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
    // const companyModalRef = this.modalService.open(CreateCompanyModalComponent);
    // companyModalRef.componentInstance.userObject = this.userObject;
  }
}



