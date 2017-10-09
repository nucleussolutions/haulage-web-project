import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-show.component.html'
})
export class HaulierInfoShowComponent implements OnInit {

  haulierInfo = new HaulierInfo();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.haulierInfoService.get(+params['id'], this.token, this.apiKey).subscribe((haulierInfo: HaulierInfo) => {
        this.haulierInfo = haulierInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.haulierInfoService.destroy(this.haulierInfo, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/haulierInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
