import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ForwarderInfo} from './forwarderInfo';
import {ForwarderInfoService} from './forwarderInfo.service';
import {Response} from "@angular/http";
import {CompanyService} from '../company/company.service';
import {Company} from '../company/company';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'forwarderInfo-persist',
  templateUrl: './forwarderInfo-persist.component.html',
})
export class ForwarderInfoPersistComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  forwarderInfo = new ForwarderInfo();
  create = true;
  errors: any[];
  companyList: Company[];

  private subscription: Subscription;

  private userObject: any;

  companySearch = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .switchMap(term => term.length < 2 && this.userObject   // switch to new observable each time
              // return the http search observable
              ? [] : this.companyService.search(term, this.userObject)
              // or the observable of empty heroes if no search term
                  .map(json => {
                    this.companyList = json['searchResults'];
                    if(this.companyList){
                      return json['searchResults'].map(item => item.name);
                    }else{
                      throw 'not found';
                    }
                  }));


  constructor(private route: ActivatedRoute, private forwarderInfoService: ForwarderInfoService, private router: Router, private companyService: CompanyService, private userService: UserService) {

  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.forwarderInfoService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found. nothing to see here'
      }

    }).subscribe((forwarderInfo: ForwarderInfo) => {
      this.create = false;
      this.forwarderInfo = forwarderInfo;
    });
  }

  save() {
    this.forwarderInfoService.save(this.forwarderInfo, this.userObject).subscribe((forwarderInfo: ForwarderInfo) => {
      this.router.navigate(['/forwarderInfo', 'show', forwarderInfo.id]);
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
