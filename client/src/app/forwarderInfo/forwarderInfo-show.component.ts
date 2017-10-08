import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-show.component.html'
})
export class ForwarderInfoShowComponent implements OnInit {

  forwarderInfo = new ForwarderInfo();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router, private cookieService : CookieService) {
    this.token = cookieService.get('token');
    this.apiKey = cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.forwarderInfoService.get(+params['id'], this.token, this.apiKey).subscribe((forwarderInfo: ForwarderInfo) => {
        this.forwarderInfo = forwarderInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.forwarderInfoService.destroy(this.forwarderInfo, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/forwarderInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
