import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from './location';
import {LocationService} from './location.service';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'location-persist',
  templateUrl: './location-show.component.html',
})
export class LocationShowComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  location = new Location();

  private subscription: Subscription;

  private userObject: any;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router, private userService: UserService, private modalService: NgbModal) {

    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.locationService.get(+params['id'], this.userObject).subscribe((location: Location) => {
        this.location = location;
      });
    }, error => {
      let errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = error;
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.locationService.destroy(this.location, this.userObject).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/location','list']);
        } else {
          alert("Error occurred during delete");
        }
      }, error => {
        let errorModalRef = this.modalService.open(GeneralModalComponent);
        errorModalRef.componentInstance.modalTitle = 'Error';
        errorModalRef.componentInstance.modalMessage = error;
      });
    }
  }

}
