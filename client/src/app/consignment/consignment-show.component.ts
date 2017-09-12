import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consignment} from './consignment';
import {ConsignmentService} from './consignment.service';

@Component({
  selector: 'consignment-persist',
  templateUrl: './consignment-show.component.html'
})
export class ConsignmentShowComponent implements OnInit {

  consignment = new Consignment();

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.consignmentService.get(+params['id']).subscribe((consignment: Consignment) => {
        this.consignment = consignment;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.consignmentService.destroy(this.consignment).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/consignment','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
