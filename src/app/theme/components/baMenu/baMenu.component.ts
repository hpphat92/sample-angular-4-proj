import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

import { BaMenuService } from "../../services";
import { GlobalState } from "../../../global.state";
import { Http } from "@angular/http";
import { AppConstant } from "../../../app.constant";
import * as _ from "lodash";
import { AuthService } from "../../../shared/services/auth/auth.service";
@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  styleUrls: ['./baMenu.scss']
})
export class BaMenu {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  public items = [];
  public itemLogout = {
    title: 'Logout',
    icon: 'fa fa-fw fa-power-off',
    hidden: false,
    selected: false,
    expanded: false,
    enabled: true
  };

  constructor(private _router: Router, private _service: BaMenuService, private _state: GlobalState, private _http: Http, private _authService: AuthService) {
    this._http.get(`${AppConstant.domain}/w-api/portfolios`).map((json) => json.json()).subscribe((resp) => {
      this.items = _.map(resp.data.companies, (d, id) => {
        return {
          hidden: false,
          title: (d as any).name,
          icon: 'ion-stats-bars',
          selected: false,
          expanded: false,
          order: id + 1,
          route: {
            paths: 'app'
          },
          path: 'app',
          children: _.map((d as any).services, (sub) => {
            let objMenuConfig = {
              title: (sub as any).name,
              hidden: false,
              // route: {
              //   paths: 'portfolio-detail/' + (sub as any).mappingId
              // },
              // path: 'portfolio-detail/' + (sub as any).mappingId,
            };
            if ((sub as any).reportId) {
              let path = 'portfolio-detail/' + (sub as any).mappingId;
              (objMenuConfig as any).route = {
                paths: path
              };
              (objMenuConfig as any).path = path;
            }

            return objMenuConfig;
          })
        };
      });

    })
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      let value = this._service.getCurrentItem();
      if (value.route || value.title) {
        this._state.notifyDataChanged('menu.activeLink', value);
      }
    }
  }

  public ngOnInit(): void {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    let submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }

  public logout() {
    this._authService.logout();
    this._router.navigateByUrl('/home/login');
  }
}
