import {Component, OnInit} from '@angular/core';
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CookieService} from "ngx-cookie";
import {ForwarderInfo} from "../forwarderInfo/forwarderInfo";
import {Company} from "../company/company";
import {HaulierInfo} from "../haulierInfo/haulierInfo";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
    selector: 'app-create-profile-modal',
    templateUrl: './create-profile-modal.component.html',
    styleUrls: ['./create-profile-modal.component.css'],
    providers: [CookieService]
})
export class CreateProfileModalComponent implements OnInit, CloseGuard, ModalComponent<CreateProfileModalContext> {


    ngOnInit(): void {
        //throw new Error('Method not implemented.');

    }


    context: CreateProfileModalContext;

    private credentials: FormGroup;

    private userId : string;
    private token : string;
    constructor(public dialog: DialogRef<CreateProfileModalContext>, private haulierInfoService: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private formBuilder: FormBuilder, private cookieService: CookieService, private modal : Modal) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);

        this.credentials = this.formBuilder.group({
            name: ['', Validators.required],
            companyName: ['', Validators.required],
            companyAddress1: ['', Validators.required],
            companyAddress2: ['', Validators.required],
            companyCity: ['', Validators.required],
            companyState: ['', Validators.required],
            companyCountry: ['', Validators.required],
            companyOfficePhone: ['', Validators.required],
            companyYardPhone: ['', Validators.required],
            companyCode: ['', Validators.required],
            companyImage: ['', Validators.required],
            companyRegNo: ['', Validators.required],
            usertype: new FormControl('Admin'),
        });

        this.userId = cookieService.get('uid');
        this.token = cookieService.get('token');
    }


    submitDetails(formData) {
        //check if user id belongs to a haulier or forwarder, then make a submit call to the backend

        //todo perhaps check the uniqueness of the user id first then save

        let company = new Company();
        company.name = formData.value.companyName;
        company.address1 = formData.value.companyAddress1;
        company.address2 = formData.value.companyAddress2;
        company.city = formData.value.companyCity;
        company.state = formData.value.companyState;
        company.country = formData.value.companyCountry;
        company.registrationNo = formData.value.companyRegNo;
        // company.companyImgUrl =

        //upload photos to amazon s3 or firebase storage


        if (formData.value.usertype === 'Admin') {
            let haulierInfo = new HaulierInfo();
            haulierInfo.name = formData.value.name;
            haulierInfo.userId = this.userId;
            haulierInfo.company = company;

            this.haulierInfoService.save(haulierInfo).subscribe(response => {
                console.log('haulier service save response '+JSON.stringify(response));

                let responseStr = JSON.stringify(response);

                response = JSON.parse(responseStr);


            }, error => {
                this.modal.alert()
                    .title('Error')
                    .message(error).open();
            })

        }else if(formData.value.usertype === 'Manager'){
            let forwarderInfo = new ForwarderInfo();

            forwarderInfo.userId = this.userId;
            forwarderInfo.company = company;
            forwarderInfo.name = formData.value.name;

            this.forwarderInfoService.save(forwarderInfo).subscribe(response => {
                console.log('forwarder service save response '+JSON.stringify(response));

                let responseStr = JSON.stringify(response);

                response = JSON.parse(responseStr);


            }, error => {
                this.modal.alert()
                    .title('Error')
                    .message(error).open();
            });
        }
    }
}


export class CreateProfileModalContext extends BSModalContext {

    public name: string;

    public companyName: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public companyState: string;

    public companyCountry: string;

    public companyOfficePhone: string;

    public companyYardPhone: string;

    public companyCode: string;

    public companyImage: File;

    public companyRegNo: string;

}
