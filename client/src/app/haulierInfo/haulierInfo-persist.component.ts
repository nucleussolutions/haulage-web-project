import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HaulierInfo} from './haulierInfo';
import {HaulierInfoService} from './haulierInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';
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
                    if(this.companyList){
                      return json['searchResults'].map(item => item.name);
                    }else{
                      throw 'not found';
                    }
                  }));

  constructor(private route: ActivatedRoute, private haulierInfoService: HaulierInfoService, private router: Router, private companyService: CompanyService, private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.companyService.list(this.userObject, 1).subscribe((companyList: Company[]) => { this.companyList = companyList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.haulierInfoService.get(+params['id'], this.userObject).subscribe((haulierInfo: HaulierInfo) => {
          this.create = false;
          this.haulierInfo = haulierInfo;
        });
      }
    });
  }

  save() {
    this.haulierInfoService.save(this.haulierInfo, this.userObject).subscribe((haulierInfo: HaulierInfo) => {
      this.router.navigate(['/haulierInfo', 'show', haulierInfo.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
