import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Tariff} from './tariff';
import {TariffService} from './tariff.service';
import {Response} from "@angular/http";
import {LocationService} from '../location/location.service';
import {Location} from '../location/location';
import {PermissionService} from "../permission/permission.service";
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';

@Component({
  selector: 'tariff-persist',
  templateUrl: './tariff-persist.component.html'
})
export class TariffPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tariff = new Tariff();
  create = true;
  errors: any[];
  locationList: Location[];

  private userObject: any;

  private subscription: Subscription;

  search = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2   // switch to new observable each time
              // return the http search observable
              ? [] : this.locationService.search(term, this.userObject)
              // or the observable of empty heroes if no search term
          .map(json => {
            let locationList = json['searchResults'];
            if(locationList){
              return json['searchResults'].map(item => item.name);
            }else{
              throw 'not found';
            }
          }));


  constructor(private route: ActivatedRoute, private tariffService: TariffService, private router: Router, private locationService: LocationService, private permissionService: PermissionService, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];
      return this.tariffService.get(+params['id'], this.userObject);
    }).subscribe((tariff: Tariff) => {
      this.create = false;
      this.tariff = tariff;
    });
  }

  save() {
    this.tariffService.save(this.tariff, this.userObject).subscribe((tariff: Tariff) => {
      this.router.navigate(['/tariff', 'show', tariff.id]);
    }, json => {
      console.log('json error ' + JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors ' + JSON.stringify(this.errors));
    });
  }

  searchLocation(term: string) {
    if (term.length > 2) {
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
          // return the http search observable
          ? this.locationService.search(term, this.userObject)
          // or the observable of empty heroes if no search term
          : Observable.of<Location[]>([]))
          .subscribe(json => {
            this.locationList = json['searchResults'];
          }, error => {
            console.log('Error searching location in tariff persist component ' + JSON.stringify(error));
            return Observable.of<Location[]>([]);
          });
    }
  }
}
