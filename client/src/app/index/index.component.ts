import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BSModalContext, Modal} from 'ngx-modialog/plugins/bootstrap';
import {CreateProfileModalComponent} from "../create-profile-modal/create-profile-modal.component";
import {overlayConfigFactory} from "ngx-modialog";
import {NavDrawerComponent} from 'app/nav-drawer/nav-drawer.component';
import {Title} from "@angular/platform-browser";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";

import { MouseEvent } from '@agm/core';


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
    if( typeof this.subscription !== 'undefined' ) {
      this.subscription.unsubscribe();
    }
  }

  @ViewChild(NavDrawerComponent)
  navDrawerComponent: NavDrawerComponent;

  private userObject: any;

  private subscription: Subscription;

  constructor(public modal: Modal, private titleService: Title, private userService: UserService, private permissionService: PermissionService) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.subscription = this.userService.getUser()
      .flatMap(userObject => {
        this.userObject = userObject;
        return this.permissionService.getByUserId(userObject);
      })
      .subscribe(permission => {
        if (permission.authority !== 'Super Admin') {
          // check if user exists in hauliers and forwarders table
          this.userService.checkUserType(this.userObject.uid, this.userObject.token, this.userObject.apiKey).then(response => {

            console.log('checkUserType response '+response);

            //todo do something




          }, error => {
            if (error.status === 422) {
              setTimeout(() => {
                if (this.userObject.token) {
                  this.modal
                    .open(CreateProfileModalComponent, overlayConfigFactory({
                      isBlocking: false,
                      size: 'lg'
                    }, BSModalContext));
                }
              });
            } else {
              this.modal.alert().title('Error').message(error.message).open();
            }

          });

        }
      }, error => {
        if (error.status == 400) {
          setTimeout(() => {
            if (this.userObject.token) {
              this.modal
                .open(CreateProfileModalComponent, overlayConfigFactory({
                  isBlocking: false,
                  size: 'lg'
                }, BSModalContext));
            }
          });
        }
        console.log('NavDrawerComponent permissionService error ' + error);
      });
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
