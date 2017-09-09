import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-show.component.html'
})
export class ForwarderInfoShowComponent implements OnInit {

  forwarderInfo = new ForwarderInfo();

  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.forwarderInfoService.get(+params['id']).subscribe((forwarderInfo: ForwarderInfo) => {
        this.forwarderInfo = forwarderInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.forwarderInfoService.destroy(this.forwarderInfo).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/forwarderInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
