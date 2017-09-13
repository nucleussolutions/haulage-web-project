import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Customer} from './customer';
import {CustomerService} from './customer.service';

@Component({
  selector: 'customer-persist',
  templateUrl: './customer-show.component.html'
})
export class CustomerShowComponent implements OnInit {

  customer = new Customer();

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.customerService.get(+params['id']).subscribe((customer: Customer) => {
        this.customer = customer;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.customerService.destroy(this.customer).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/customer','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
