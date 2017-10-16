import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { UserService } from 'app/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;

    constructor(private formBuilder: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private modal: Modal) {
        this.credentials = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });

        this.titleService.setTitle('Login');
    }

    ngOnInit() {
    }

    login(formData) {
        // console.log('login formData '+JSON.stringify(formData));
        console.log('login email ' + formData.value.email);
        console.log('login password ' + formData.value.password);

        this.userService.login(formData.value.email, formData.value.password).then(response => {
            this.router.navigate(['/index']);
        }, error => {
            this.modal.alert().title('Error').message(error).open();
        });

    }
}
