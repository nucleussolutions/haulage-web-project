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
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.css'],
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {

  @Input() userObject: any;

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {

  }

  private personalDetails: FormGroup;

  private subscription: Subscription;

  private fileReader: FileReader;

  private base64Encoded: string;

  encodeFile(file : File) {
    this.fileReader.readAsDataURL(file);
  }

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService, private userInfoService: UserInfoService, public activeModal: NgbActiveModal) {

    this.personalDetails = this.formBuilder.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress1: ['', Validators.required],
      companyAddress2: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyState: ['', Validators.required],
      companyCountry: new FormControl('Malaysia'),
      companyOfficePhone: ['', Validators.required],
      companyYardPhone: ['', Validators.required],
      companyCode: ['', Validators.required],
      companyImage: [''],
      companyRegNo: ['', Validators.required],
      usertype: new FormControl('Admin'),
    });

    this.fileReader.onload = (file) => {
      this.base64Encoded = this.fileReader.result;
      console.log("Encoded file!");
    }
  }

  submitDetails(formData) {
    //check if user id belongs to a haulier or forwarder, then make a submit call to the backend

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
    //todo convert companyImage to base64 string

    this.encodeFile(formData.value.companyImage);

    company.companyImgUrl = this.base64Encoded;

    //upload photos to amazon s3 or firebase storage

    let userInfo = new UserInfo();
    userInfo.name = formData.value.name;
    userInfo.userId = this.userObject.uid;
    userInfo.company = company;

    let permission = new Permission();
    permission.email = this.userObject.email;

    if (formData.value.usertype === 'Admin') {
      permission.authority = 'Admin';
    } else if (formData.value.usertype === 'Manager') {
      permission.authority = 'Manager'
    }

    userInfo.permissions.push(permission);



    this.userInfoService.save(userInfo, this.userObject).subscribe(userInfo => {
      this.activeModal.dismiss();
    }, error => {

    });
  }
}



