import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { Location } from './location';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserService } from 'app/user.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/share";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
})
export class LocationListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  locationList: Location[] = [];

  private subscription: Subscription;

  private userObject: any;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;


  constructor(private route: ActivatedRoute, private locationService: LocationService, private modal: Modal, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.callLocations();
  }

  callLocations(){
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {
      this.userObject = result[0];
      //if params doesnt exist, let api call, if there is, then proceed to call the api by page number
      let params = result[1];
      console.log('params ' + JSON.stringify(params));
      if (params['page']) {
        this.page = params['page'];
      }

      this.offset = (this.page - 1) * this.limit;
      return this.locationService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.locationList = [];

      data.forEach(locationDatum => {
        let location = new Location(locationDatum.attributes);
        location.id = locationDatum.id;
        this.locationList.push(location);
      });

      this.locationService.count(this.userObject).subscribe(count => {
        this.count = count;
        console.log('location count ' + this.count);
      });

    }, error => {

      console.log('location list error ' + JSON.stringify(error));
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = "Internal server error";
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

      dialog.result.then(result => {
        this.router.navigate(['/login']);
      });
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/location', 'list'], { queryParams: { page: (offset / this.limit) + 1 } });
  }

  search(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.locationService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Location[]>([]))
        .subscribe(json => {
          this.locationList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log('Error in component ' + JSON.stringify(error));
          return Observable.of<Location[]>([]);
        });
    } else {
      //todo should call the original page number to get the results again
      this.callLocations();
    }
  }
}
