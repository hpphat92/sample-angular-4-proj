import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";
import { AuthService } from "app/shared/services";
import { ToastrService } from "ngx-toastr";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.scss']
})
export class ForgotPassword {

  public frm: FormGroup;
  public email: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
              private _auth: AuthService,
              private _router: Router,
              private _toast: ToastrService) {
    this.frm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
    });

    this.email = this.frm.controls['email'];
  }

  public onSubmit(formValue: any): void {
    this.submitted = true;
    if (this.frm.valid) {
      this._auth.forgotPassword({
        email: formValue.email
      }).subscribe((resp) => {

        this._router.navigate(['page', 'login']);
        this._toast.success('An email has been sent to the address on file covering how to reset your password');
        // this._toast.success("Your password has successful reset", "Success");
        // this._router.navigate(['page', 'login']);
      }, (err: any) => {
        this.submitted = false;
      });
      // your code goes here
      // console.log(values);
    }
  }
}
