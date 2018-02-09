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

  constructor(private titleService: Title, private userService: UserService, private permissionService: PermissionService, private modalService: NgbModal, private userInfoService: UserInfoService) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // this.subscription = this.userService.getUser()
    //     .flatMap(userObject => {
    //       this.userObject = userObject;
    //       return this.permissionService.getByUserId(userObject);
    //     })
    //     .subscribe(permissions => {
    //
    //     }, error => {
    //       if (error.status == 400) {
    //         setTimeout(() => {
    //           if (this.userObject.token) {
    //             // this.modal
    //             //   .open(CreateProfileModalComponent, overlayConfigFactory({
    //             //     isBlocking: false,
    //             //     size: 'lg'
    //             //   }, BSModalContext));
    //             this.modalService.open(CreateProfileModalComponent, {
    //               size: 'lg'
    //             });
    //           }
    //         });
    //       }
    //       console.log('NavDrawerComponent permissionService error ' + error);
    //     });

    //todo check if user info exists, if not, pop up a dialog
    this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.userInfoService.getByUserId(this.userObject);
    }).subscribe(userInfo => {
      //nothing to do here
    }, error => {
      this.modalService.open(CreateProfileModalComponent, {
        size: 'lg'
      });
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
