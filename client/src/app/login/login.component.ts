import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import { NavDrawerService } from 'app/nav-drawer.service';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [NavDrawerService]
})
export class LoginComponent implements OnInit {

    private credentials: FormGroup;

    constructor(private formBuilder: FormBuilder, private titleService : Title, private cookieService: CookieService, private router: Router, private firebaseAuth: AngularFireAuth, private navDrawerService : NavDrawerService, private modal : Modal) {
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
        console.log('login email '+formData.value.email);
        console.log('login password '+formData.value.password);

        this.firebaseAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(response => {

            let responseStr = JSON.stringify(response);

            response = JSON.parse(responseStr);

            this.cookieService.put('uid', response.uid);
            this.cookieService.put('emailVerified', response.emailVerified);
            this.cookieService.put('displayName', response.displayName);
            this.cookieService.put('photoUrl', response.photoURL);
            this.cookieService.put('apiKey', response.apiKey);
            this.cookieService.put('refreshToken', response.stsTokenManager.refreshToken);
            this.cookieService.put('token', response.stsTokenManager.accessToken);
            this.cookieService.put('expiresIn', response.stsTokenManager.expiresIn);

            //todo if email is not verified, pop up a dialog for them to verify email
            this.navDrawerService.trigger(true);
            this.router.navigate(['/index']);
        }, error => {
            this.modal.alert().title('Error').message(error).open();
        });
    }
}
