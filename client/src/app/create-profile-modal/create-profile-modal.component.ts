import { Component, OnInit } from '@angular/core';
import {BSModalContext} from "ngx-modialog/plugins/bootstrap";
import {CloseGuard, DialogRef, ModalComponent} from "ngx-modialog";
import {HaulierInfoService} from "../haulierInfo/haulierInfo.service";
import {ForwarderInfoService} from "../forwarderInfo/forwarderInfo.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CookieService} from "ngx-cookie";

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

    constructor(public dialog: DialogRef<CreateProfileModalContext>, private haulierInfo: HaulierInfoService, private forwarderInfoService: ForwarderInfoService, private formBuilder: FormBuilder, private cookieService: CookieService) {
      this.context = dialog.context;
      dialog.setCloseGuard(this);

      this.credentials = this.formBuilder.group({
        name : ['', Validators.required],
        companyName : ['', Validators.required],
        companyAddress1: ['', Validators.required],
        companyAddress2: ['', Validators.required],
        companyCity: ['', Validators.required],
        companyState: ['', Validators.required],
        companyCountry: ['', Validators.required],
        companyOfficePhone: ['', Validators.required],
        companyYardPhone: ['', Validators.required],
        companyCode: ['', Validators.required],
        companyImage: ['', Validators.required],
        companyRegNo: ['', Validators.required]
      })
    }



  submitDetails(formData){
    //check if user id belongs to a haulier or forwarder, then make a submit call to the backend



  }
}



export class CreateProfileModalContext extends BSModalContext {

  public name : string;

  public companyName: string;

  public companyAddress1 : string;

  public companyAddress2 : string;

  public companyCity: string;

  public companyState : string;

  public companyCountry : string;

  public officePhone : string;

  public yardPhone: string;

  public companyCode : string;

  public companyImage : File;

  public companyRegNo : string;

}
