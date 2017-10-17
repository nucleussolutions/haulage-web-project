import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from './location';
import {LocationService} from './location.service';
import {CookieService} from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'location-persist',
  templateUrl: './location-show.component.html',
  providers: [UserService]
})
export class LocationShowComponent implements OnInit, OnDestroy {

  location = new Location();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router, private userService: UserService, private modal : Modal) {

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.locationService.get(+params['id'], this.token, this.apiKey).subscribe((location: Location) => {
        this.location = location;
      });
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.locationService.destroy(this.location, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/location','list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
          this.modal.alert().title('Error').message(error).open();
      });
    }
  }

}
