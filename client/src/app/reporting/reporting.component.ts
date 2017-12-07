import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor() { }

  ngOnInit() {
  }

}
