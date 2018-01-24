import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {


  constructor() {
    // this.context = dialog.context;
    // dialog.setCloseGuard(this);
  }

  ngOnInit() {
  }
}


// export class LoadingCustomModalContext extends BSModalContext {
//   message: string;
// }