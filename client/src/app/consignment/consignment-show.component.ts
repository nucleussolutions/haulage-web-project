import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';
import {CookieService} from "ngx-cookie";
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-show.component.html'
})
export class ConsignmentShowComponent implements OnInit {

  consignment = new Consignment();

  private token : string;

  private apiKey : string;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router, private  cookieService: CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.consignmentService.get(+params['id'], this.token, this.apiKey).subscribe((consignment: Consignment) => {
        this.consignment = consignment;
      }, error => {
        this.modal.alert()
            .title('Error')
            .message(error)
            .open();
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.consignmentService.destroy(this.consignment, this.token, this.apiKey).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/consignment','list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
          this.modal.alert()
              .title('Error')
              .message(error)
              .open();
      });
    }
  }

}
