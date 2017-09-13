import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TransportRequest} from './transportRequest';
import {TransportRequestService} from './transportRequest.service';

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-show.component.html'
})
export class TransportRequestShowComponent implements OnInit {

  transportRequest = new TransportRequest();

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transportRequestService.get(+params['id']).subscribe((transportRequest: TransportRequest) => {
        this.transportRequest = transportRequest;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transportRequestService.destroy(this.transportRequest).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transportRequest','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
