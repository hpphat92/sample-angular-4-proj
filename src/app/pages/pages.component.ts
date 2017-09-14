import { Component, ElementRef } from "@angular/core";
import { Routes } from "@angular/router";

import { BaMenuService } from "../theme";
import { PAGES_MENU } from "./pages.menu";
import { AuthService } from "../shared/services/auth/auth.service";
import { UserInfo } from "../shared/models/user.model";

@Component({
  selector: 'pages',
  styleUrls: ['pages.scss'],
  templateUrl: 'pages.component.html'
})
export class Pages {
  public userInfo: UserInfo

  constructor(private _menuService: BaMenuService,
              private _authService: AuthService,
              private _elementRef: ElementRef) {
    if (this._authService.userToken.isLoggedInAsImperson) {
      document.body.classList.add('imperson');
    }
    this.userInfo = this._authService.currentUser;
    this._authService.currentUserInfo$.subscribe(
      (userInfo) => {
        this.userInfo = userInfo;
      });
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
