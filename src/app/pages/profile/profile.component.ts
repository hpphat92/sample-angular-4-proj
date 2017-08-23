import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalState } from "../../global.state";

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public tabs = [];

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _state: GlobalState) {

  }

  public ngOnInit(): void {
    this.tabs = [
      {
        id: 0,
        name: 'Information',
        redirectUrl: 'profile-info',
        isActive: false
      },
      {
        id: 1,
        name: 'Password',
        redirectUrl: 'profile-password',
        isActive: false
      }];

    // Config active nav tab when router changes
    this._router.events.subscribe((val: any) => {
      this.configNavTabs(val.urlAfterRedirects);
    });
  }

  public configNavTabs(url: string): void {
    if (url) {
      let lastUrl = url.split('/');

      this.tabs.forEach(item => {
        item.isActive = false;
        if (item.redirectUrl === lastUrl[lastUrl.length - 1]) {
          item.isActive = true;
        }
      });

    } else {
      this.tabs.forEach(item => {
        item.isActive = false;
      });
      this.tabs[0].isActive = true;
    }
  }

  public switchTab(event: Event, index: number): void {
    // Avoid click to tab when click delete on this tab
    if (!event.target['innerText']) {
      return;
    }
    this._router.navigate([this.tabs[index].redirectUrl], {relativeTo: this._activatedRoute});
  }
}
