import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Tariff} from './tariff';
import {TariffService} from './tariff.service';
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

  private userObject: any;

  private subscription: Subscription;

  private locationList: Location[];

  search = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.locationService.search(term, this.userObject)
              // or the observable of empty heroes if no search term
          .map(json => {
            this.locationList = json['searchResults'];
            if(this.locationList){
              return json['searchResults'].map(item => item.name);
            }else{
              throw 'not found';
            }
          }));



  selectedLocation(item){
    console.log(item.item);
    let listofSelectedLocation = this.locationList.filter(location => location.name == item.item);
    this.tariff.location = listofSelectedLocation[0];
    console.log(this.tariff.location);
  }


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
}
