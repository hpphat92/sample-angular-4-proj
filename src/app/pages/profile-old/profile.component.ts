import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AppConstant } from "../../app.constant";
import { GlobalState } from "../../global.state";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'profile',
  styleUrls: ['./profile.scss'],
  templateUrl: './profile.html'
})
export class Profile {
  public profile = {};
  public frm: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public telephone: AbstractControl;
  public submitted: boolean = false;

  constructor(private _http: Http, private _state: GlobalState, private fb: FormBuilder, private _authService: AuthService) {
    this._http.get(`${AppConstant.domain}/w-api/profile`).map((json) => json.json()).subscribe((resp) => {
      this.frm.setValue(resp.data);
    }, () => {

    }, () => {
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'general.menu.profile'
      });
    });

    this.frm = fb.group({
      'id': [''],
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
      'telephone': ['', Validators.compose([Validators.required, Validators.pattern('[\\d-+]*')
      ])]
    });
    this.firstName = this.frm.controls['firstName'];
    this.lastName = this.frm.controls['lastName'];
    this.email = this.frm.controls['email'];
    this.telephone = this.frm.controls['telephone'];
  }

  public onSubmit() {
    this.submitted = true;
    this._authService.updateUserProfile(this.frm.value).subscribe((resp) => {
      this.submitted = false;
    })
  }
}
