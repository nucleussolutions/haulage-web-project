import { Component, OnInit, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  constructor() { }

  ngOnInit() {

  }

}
