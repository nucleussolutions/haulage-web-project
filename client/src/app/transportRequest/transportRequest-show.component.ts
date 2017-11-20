import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransportRequest } from './transportRequest';
import { TransportRequestService } from './transportRequest.service';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'transportRequest-persist',
  templateUrl: './transportRequest-show.component.html',
})
export class TransportRequestShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transportRequest = new TransportRequest();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private transportRequestService: TransportRequestService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(response => {
      console.log('forkJoin works');
      this.userObject = response[0];
      let params = response[1];
      return this.transportRequestService.get(+params['id'], this.userObject);
    }).subscribe((transportRequest: TransportRequest) => {
      this.transportRequest = transportRequest;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.transportRequestService.destroy(this.transportRequest, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/transportRequest', 'list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
