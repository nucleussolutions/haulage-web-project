import {Component, OnInit, OnDestroy} from '@angular/core';
import {VehicleService} from './vehicle.service';
import {Vehicle} from './vehicle';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  vehicleList: Vehicle[] = [];

  private subscription: Subscription;

  private page: number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private userService: UserService, private modal: Modal, private titleService: Title, private router: Router) {

    this.titleService.setTitle('Vehicles');
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.vehicleService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.vehicleService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.vehicleList = [];

      data.forEach(vehicleDatum => {
        let vehicle = new Vehicle(vehicleDatum.attributes);
        vehicle.id = vehicleDatum.id;
        this.vehicleList.push(vehicle);
      });

    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      console.log('error.status ' + error.status);

      const dialog = this.modal.alert().title('Error').message(message).open();

    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset ' + offset);
    this.offset = offset;
    this.router.navigate(['/vehicle', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }

  search(term: string) {
    if(term.length > 2){
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.vehicleService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Vehicle[]>([]))
        .subscribe(json => {
          // this.vehicleList = vehicleList;
          this.vehicleList = json['searchResults'];
          this.count = json['total'];

        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Vehicle[]>([]);
        });
    }else{
        //todo should call the original page number to get the results again
        
    }
  }
}
