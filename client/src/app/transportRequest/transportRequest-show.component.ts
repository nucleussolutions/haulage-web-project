import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransportRequest } from './transportRequest';
import { TransportRequestService } from './transportRequest.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-show.component.html'
})
export class TransportRequestShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transportRequest = new TransportRequest();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transportRequestService.get(+params['id'], this.userObject.token, this.userObject.apiKey).subscribe((transportRequest: TransportRequest) => {
        this.transportRequest = transportRequest;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transportRequestService.destroy(this.transportRequest, this.userObject.token, this.userObject.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transportRequest', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
