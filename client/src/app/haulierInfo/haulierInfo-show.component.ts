import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';

@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-show.component.html'
})
export class HaulierInfoShowComponent implements OnInit {

  haulierInfo = new HaulierInfo();

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.haulierInfoService.get(+params['id']).subscribe((haulierInfo: HaulierInfo) => {
        this.haulierInfo = haulierInfo;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.haulierInfoService.destroy(this.haulierInfo).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/haulierInfo','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
