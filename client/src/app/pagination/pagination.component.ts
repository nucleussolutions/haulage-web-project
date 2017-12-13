import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {



  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor() { }

  ngOnInit() {
  }

}
