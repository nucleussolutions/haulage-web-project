import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {Company} from "../company/company";
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.css'],
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  private personalDetails: FormGroup;

  private userObject: any;

  private subscription: Subscription;

  constructor(private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private userService: UserService) {

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

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    })
  }


  submitDetails(formData) {
    //check if user id belongs to a haulier or forwarder, then make a submit call to the backend

    //todo perhaps check the uniqueness of the user id first then save

    let loadingSpinner = document.getElementById('loading-spinner');


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
    // company.companyImgUrl =

    //upload photos to amazon s3 or firebase storage

    if (formData.value.usertype === 'Admin') {
      let haulierInfo = new HaulierInfo();
      haulierInfo.name = formData.value.name;
      haulierInfo.userId = this.userObject.uid;
      haulierInfo.company = company;

      this.haulierInfoService.save(haulierInfo, this.userObject).subscribe(response => {
        console.log('haulier service save response ' + JSON.stringify(response));

        let responseStr = JSON.stringify(response);

        response = JSON.parse(responseStr);

        // this.dialog.dismiss();
      }, error => {
        console.log('haulierInfoService error ' + error.json());
        // this.modal.alert()
        //   .title('Error')
        //   .message(error.json().message).open();
      });

    } else if (formData.value.usertype === 'Manager') {
      let forwarderInfo = new ForwarderInfo();

      forwarderInfo.userId = this.userObject.uid;
      forwarderInfo.company = company;
      forwarderInfo.name = formData.value.name;

      this.forwarderInfoService.save(forwarderInfo, this.userObject).subscribe(response => {
        console.log('forwarder service save response ' + JSON.stringify(response));

        let responseStr = JSON.stringify(response);

        response = JSON.parse(responseStr);

        // this.dialog.dismiss();
      }, error => {
        console.log('forwarderInfoService error' + error.json());
        // this.modal.alert()
        //   .title('Error')
        //   .message(error.json().message).open();
      });
    }
  }
}



