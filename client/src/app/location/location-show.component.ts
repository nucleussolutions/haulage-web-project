import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from './location';
import {LocationService} from './location.service';
import {CookieService} from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'location-persist',
  templateUrl: './location-show.component.html'
})
export class LocationShowComponent implements OnInit {

  location = new Location();

  private token :string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router, private cookieService : CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
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
