import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransportRequest} from './transportRequest';
import {TransportRequestService} from './transportRequest.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-show.component.html'
})
export class TransportRequestShowComponent implements OnInit {

  transportRequest = new TransportRequest();

  private token : string;

  private apiKey: string;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private cookieService : CookieService) {
    this.token = cookieService.get('token');
    this.apiKey = cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transportRequestService.get(+params['id'], this.token, this.apiKey).subscribe((transportRequest: TransportRequest) => {
        this.transportRequest = transportRequest;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transportRequestService.destroy(this.transportRequest, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transportRequest','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
