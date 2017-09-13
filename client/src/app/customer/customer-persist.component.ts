import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import {Response} from "@angular/http";


@Component({
  selector: 'customer-persist',
  templateUrl: './customer-persist.component.html'
})
export class CustomerPersistComponent implements OnInit {

  customer = new Customer();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.customerService.get(+params['id']).subscribe((customer: Customer) => {
          this.create = false;
          this.customer = customer;
        });
      }
    });
  }

  save() {
    this.customerService.save(this.customer).subscribe((customer: Customer) => {
      this.router.navigate(['/customer', 'show', customer.id]);
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
