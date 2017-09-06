import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../register.service";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    // private credentials: FormGroup;

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
        // this.credentials = this.formBuilder.group({
        //     email: ['', Validators.compose([Validators.required, Validators.email])],
        //     password: ['', Validators.required],
        // });
    }

    ngOnInit() {
    }


    register(formData) {
        this.registerService.register(formData.value.email, formData.value.password, false).then(value => {

        })
    }
}
