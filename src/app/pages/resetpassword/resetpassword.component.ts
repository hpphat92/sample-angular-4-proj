import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ApiResponse } from "../../shared/models/api-response.model";

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.html',
  styleUrls: ['./resetpassword.scss']
})
export class ResetPassword {

  public frm: FormGroup;
  public confirmPassword: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public validLinkStatus: any = {};
  public token: string = '';

  constructor(private fb: FormBuilder,
              private _route: ActivatedRoute,
              private _authService: AuthService,
              private _router: Router) {
    // Declare form
    this.frm = fb.group({
      'confirmPassword': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
    }, {
      // Add validator for matching password and confirm password
      validator: EqualPasswordsValidator.validate('password', 'confirmPassword')
    });

    // Set shortcut for control that used in HTML files
    this.confirmPassword = this.frm.controls['confirmPassword'];
    this.password = this.frm.controls['password'];

    // Watch to get params of route
    this._route.params.subscribe((params) => {
      this.token = params['token'] as string;
      // Validate token to server
      this._authService.checkTokenForgotPassword(this.token).subscribe(() => {
        this.validLinkStatus = {
          isValidLink: true
        };
      }, () => {
        this.validLinkStatus = {
          isValidLink: false
        };
      })
    })
  }

  public onSubmit(formValue: any): void {
    this.submitted = true;
    if (this.frm.valid) {
      let data = {
        "code": this.token,
        "isLoginNow": true,
        "newPassword": formValue.password
      };
      this.submitted = true;
      this._authService.resetPassword(data).subscribe((resp) => {
        this._authService.setToken(resp.data);
        // Add automatically grant token after expiring
        this._authService.refreshToken();

        this._authService.getUserInfo().subscribe((response: ApiResponse<any>) => {
          this._authService.updateUserInfo(response.data);
        });

        this._router.navigate(['app', 'dashboard']);
      }, (err) => {
        this.submitted = false;
      })
    }
  }
}
