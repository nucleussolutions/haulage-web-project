import {Component, OnInit} from '@angular/core';
import {CustomerService} from './customer.service';
import {Customer} from './customer';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.list().subscribe((customerList: Customer[]) => {
      this.customerList = customerList;
    });
  }
}
