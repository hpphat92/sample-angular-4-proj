import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EqualPasswordsValidator } from "../../../../theme/validators/equalPasswords.validator";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { GlobalState } from "app/global.state";

@Component({
  selector: 'profile-password',
  templateUrl: './password.html',
  styleUrls: ['./password.scss']

})
export class ProfilePasswordComponent implements AfterViewInit {

  public frm: FormGroup;
  public confirmPassword: AbstractControl;
  public password: AbstractControl;
  public oldPassword: AbstractControl;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._state.notifyDataChanged('menu.activeLink', {
        title: 'Password'
      });
    })
  }

  constructor(fb: FormBuilder, private _authService: AuthService, private _state: GlobalState) {
    this.frm = fb.group({
      'confirmPassword': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      'password': ['', [Validators.required]],
      'oldPassword': ['', [Validators.required]],
    }, {
      // Add validator for matching password and confirm password
      validator: EqualPasswordsValidator.validate('password', 'confirmPassword')
    });

    // Set shortcut for control that used in HTML files
    this.confirmPassword = this.frm.controls['confirmPassword'];
    this.password = this.frm.controls['password'];
    this.oldPassword = this.frm.controls['oldPassword'];

  }

  public changePassword() {
    let model = {
      "currentPassword": this.oldPassword.value,
      "newPassword": this.password.value
    }
    this._authService.changePassword(model).subscribe(() => {
      this.frm.reset();
    })
  }
}
