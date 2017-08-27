import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../login.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    login(formData) {

    }
}
