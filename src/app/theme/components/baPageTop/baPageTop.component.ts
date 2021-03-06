import { AfterViewInit, Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements AfterViewInit {
  ngAfterViewInit(): void {

  }

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public currentUser = null;

  constructor(private _state: GlobalState,
              private _authService: AuthService,
              private _router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.currentUser = this._authService.currentUser;
    this._authService.currentUserInfo$.subscribe(
      (userInfo) => {
        this.currentUser = userInfo;
      });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout() {
    this._authService.logout();
    // this._authService.logout().subscribe(() => {
    this._router.navigate(['home', 'login']);
    // });
  }

  public goProfile() {
    this._router.navigate(['app', 'profile'])
  }
}
