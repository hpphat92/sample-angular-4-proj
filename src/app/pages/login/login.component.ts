import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../shared/services/auth/auth.service";
import { ApiResponse } from "../../shared/models/api-response.model";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public frm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private _auth: AuthService,
              private _toast: ToastrService,
              private _router: Router) {
    this.frm = fb.group({
      'email': ['phat@mail.com', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
      'password': ['1111', [Validators.required]],
      'rememberMe': ['']
    });

    this.email = this.frm.controls['email'];
    this.password = this.frm.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.frm.valid) {
      this.frm.disable();
      this._auth.authorize(this.frm.value).subscribe((resp: ApiResponse<any>) => {
        this._auth.setToken(resp.data);
        this._auth.refreshToken();
        this.submitted = false;
        this._router.navigate(['app', 'portfolio']);
      }, (err: ApiResponse<any>) => {
        this.submitted = false;
        this._toast.error(err.message, "Error");
        this.frm.enable();
      });
    }
  }
}