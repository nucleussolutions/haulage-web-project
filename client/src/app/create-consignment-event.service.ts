import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Consignment} from "./consignment/consignment";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class CreateConsignmentEventService {

  private consignmentCreatedSource = new ReplaySubject<Consignment>();

  private consignmentUpdatedSource = new BehaviorSubject<Consignment>(new Consignment());

  consignmentCreated$ = this.consignmentCreatedSource.asObservable();

  consignmentUpdated$ = this.consignmentUpdatedSource.asObservable();

  constructor() {

  }

  createConsignment(consignment: Consignment){
    this.consignmentCreatedSource.next(consignment);
  }

  updateConsignment(consignment: Consignment){
    this.consignmentUpdatedSource.next(consignment);
  }

}
