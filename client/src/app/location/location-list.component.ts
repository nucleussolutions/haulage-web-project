import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Location} from './location';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import { UserService } from 'app/user.service';


@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
  providers: [UserService]
})
export class LocationListComponent implements OnInit {

  locationList: Location[] = [];

  private token : string;

  private apiKey : string;

  private userObject : any ;

  constructor(private locationService: LocationService, private modal : Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    // let token = this.cookieService.get('token');
    // let apiKey = this.cookieService.get('apiKey');

    this.userService.loginState$.subscribe(loggedIn => {

    }, error => {

    });

    this.userService.getUser().subscribe(response => {
      this.userObject = response;
    }, error => {

    });

    this.locationService.list(this.userObject.token, this.userObject.apiKey).subscribe((locationList: Location[]) => {
      this.locationList = locationList;
    }, error => {
      let message;

      if(error.status === 401){
        message = 'Unauthorized';
      }else if(error.status === 500){
        message = "Internal server error";
      }else if(error.status === 400){
        message = 'Bad request';
      }

      const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

      dialog.then(value => {
        //todo trigger an event to reload the navdrawer component
        this.router.navigate(['/login']);
      });

      // this.navDrawerService.trigger(false);
      // this.cookieService.removeAll();
    });
  }

}
