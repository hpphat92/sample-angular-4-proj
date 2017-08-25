import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalState } from "../../../../global.state";
import { AppConstant } from "../../../../app.constant";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { ExtendedHttpService } from "../../../../shared/services/http/http.service";

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.html',
  styleUrls: ['./profile-info.scss']

})
export class ProfileInfoComponent {
  public profile = {};
  public frm: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public telephone: AbstractControl;
  public submitted: boolean = false;

  constructor(private _http: ExtendedHttpService, private _state: GlobalState, private fb: FormBuilder, private _authService: AuthService) {
    this._http.get(`${AppConstant.domain}/w-api/profile`).map((json) => json.json()).subscribe((resp) => {
      this.frm.setValue(resp.data);
    }, () => {

    }, () => {
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'My Profile'
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
