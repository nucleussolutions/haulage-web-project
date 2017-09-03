import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-update-haulier-profile',
  templateUrl: './update-haulier-profile.component.html',
  styleUrls: ['./update-haulier-profile.component.css']
})
export class UpdateHaulierProfileComponent implements OnInit {

  private credentials : any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  updateHaulierProfile(formData){

  }

}
