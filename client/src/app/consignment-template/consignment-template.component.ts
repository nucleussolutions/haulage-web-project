import { Component, OnInit } from '@angular/core';
import {Consignment} from "../consignment/consignment";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {ConsignmentService} from "../consignment/consignment.service";

@Component({
  selector: 'app-consignment-template',
  templateUrl: './consignment-template.component.html',
  styleUrls: ['./consignment-template.component.css']
})
export class ConsignmentTemplateComponent implements OnInit {

  consignment: Consignment;

  private userObject:any;

  constructor(private userService: UserService, private route: ActivatedRoute, private consignmentService: ConsignmentService) { }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {

      this.userObject = result[0];

      let params = result[1];

      return this.consignmentService.get(params['id'], this.userObject);
    }).subscribe(consignment => {
      this.consignment = consignment;
    });
  }

  print(){
    window.print();
  }
}
