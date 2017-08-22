import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ApiResponse } from "../../shared/models/api-response.model";
import { Router } from "@angular/router";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {

  public frm: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;
  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private _auth: AuthService,
              private _toast: ToastrService,
              private _router: Router) {
    this.frm = fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],

    },{
      validator: EqualPasswordsValidator.validate('password', 'confirmPassword')
    });

    this.firstName = this.frm.controls['firstName'];
    this.lastName = this.frm.controls['lastName'];
    this.email = this.frm.controls['email'];
    this.password = this.frm.controls['password'];
    this.confirmPassword = this.frm.controls['confirmPassword'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.frm.valid) {
      this.frm.disable();
      this._auth.signup(this.frm.value).subscribe((resp: ApiResponse<any>) => {
        this._auth.setToken(resp.data);
        this._auth.refreshToken();
        this.submitted = false;

        this._router.navigate(['pages', 'dashboard']);

      }, (err: ApiResponse<any>) => {
        this.submitted = false;
        this.frm.enable();
      });
    }
  }
}
