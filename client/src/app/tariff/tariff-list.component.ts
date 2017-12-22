import {Component, OnDestroy, OnInit} from '@angular/core';
import {TariffService} from './tariff.service';
import {Tariff} from './tariff';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'tariff-list',
  templateUrl: './tariff-list.component.html'
})
export class TariffListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tariffList: Tariff[] = [];

  private subscription: Subscription;

  private page : number = 1;

  private nextLink: string;

  private firstLink: string;

  private lastLink: string;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  private userObject: any;

  constructor(private route: ActivatedRoute, private tariffService: TariffService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];
      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
        console.log('tariff page '+this.page);
      }

      this.offset = (this.page - 1) * this.limit;

      this.tariffService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.tariffService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      let links = json['links'];
      this.nextLink = links.next;
      this.firstLink = links.first;
      this.lastLink = links.last;

      this.tariffList = [];

      data.forEach(tariffDatum => {
        let tariff = new Tariff(tariffDatum.attributes);
        tariff.id = tariffDatum.id;
        this.tariffList.push(tariff);
      });
    });
  }

  onPageChange(offset) {
    console.log('onPageChange offset '+offset);
    this.offset = offset;
    this.router.navigate(['/tariff', 'list'], {queryParams: {page: (offset / this.limit) + 1}});
  }

  search(term: string){
    if(term.length > 2){
      Observable.of(term).debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.tariffService.search(term, this.userObject)
        // or the observable of empty heroes if no search term
        : Observable.of<Tariff[]>([]))
        .subscribe(tariffList => {
          this.tariffList = json['searchResults'];
          this.count = json['total'];
        }, error => {
          // TODO: real error handling
          console.log(`Error in component ... ${error}`);
          return Observable.of<Tariff[]>([]);
        });
    }else{
      
    }
  }
}
