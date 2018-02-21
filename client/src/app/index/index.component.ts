import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CreateProfileModalComponent} from "../create-profile-modal/create-profile-modal.component";
import {NavDrawerComponent} from 'app/nav-drawer/nav-drawer.component';
import {Title} from "@angular/platform-browser";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";

import {MouseEvent} from '@agm/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";
import {UserInfoService} from "../userInfo/userInfo.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @ViewChild(NavDrawerComponent)
  navDrawerComponent: NavDrawerComponent;

  private userObject: any;

  private subscription: Subscription;

  constructor(private titleService: Title, private userService: UserService, private permissionService: PermissionService, private modalService: NgbModal, private userInfoService: UserInfoService, private router: Router) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // check if user info exists, if not, pop up a dialog
    this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      if(this.userObject.uid){
        return this.userInfoService.getByUserId(this.userObject);
      }else{
        this.router.navigate(['/login']);
        throw 'redirect to login'
      }
    }).subscribe(userInfo => {
      //nothing to do here
      // const createProfileModalRef = this.modalService.open(CreateProfileModalComponent, {
      //   size: 'lg'
      // });
      // createProfileModalRef.componentInstance.userObject = this.userObject;
    }, error => {
      const createProfileModalRef = this.modalService.open(CreateProfileModalComponent, {
        size: 'lg'
      });
      createProfileModalRef.componentInstance.userObject = this.userObject;
    })
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
