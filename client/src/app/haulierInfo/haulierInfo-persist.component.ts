import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';
import {Response} from "@angular/http";
import {CompanyService} from '../company/company.service';
import {Company} from '../company/company';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'haulierInfo-persist',
  templateUrl: './haulierInfo-persist.component.html'
})
export class HaulierInfoPersistComponent implements OnInit {

  haulierInfo = new HaulierInfo();
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
                    if (this.companyList) {
                      return json['searchResults'].map(item => item.name);
                    } else {
                      throw 'not found';
                    }
                  }));

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private companyService: CompanyService, private userService: UserService) {

  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      if (params.hasOwnProperty('id')) {
        return this.haulierInfoService.get(+params['id'], this.userObject);
      } else {
        throw 'params id not found. nothing to see here';
      }

    }).subscribe((haulierInfo: HaulierInfo) => {
      this.create = false;
      this.haulierInfo = haulierInfo;
    });

  }

  save() {
    this.haulierInfoService.save(this.haulierInfo, this.userObject).subscribe((haulierInfo: HaulierInfo) => {
      this.router.navigate(['/haulierInfo', 'show', haulierInfo.id]);
    }, json => {
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
