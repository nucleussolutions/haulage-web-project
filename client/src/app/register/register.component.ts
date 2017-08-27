import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }


  register(formData){

  }
}
