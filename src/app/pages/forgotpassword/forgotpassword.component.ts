import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppConstant } from "../../app.constant";
import { AuthService } from "app/shared/services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";
import { ApiResponse } from "app/shared/models";

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.scss']
})
export class ForgotPassword {

  public frm: FormGroup;
  public frm2: FormGroup;
  public frm3: FormGroup;
  public email: AbstractControl;
  public confirmPassword: AbstractControl;
  public password: AbstractControl;
  public verifyCode: AbstractControl;
  public currentStep: any = 1;
  public submitted: boolean = false;
  public submitted2: boolean = false;
  public submitted3: boolean = false;

  constructor(fb: FormBuilder,
              private _auth: AuthService,
              private _router: Router,
              private _toast: ToastrService) {
    this.frm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
    });
    this.frm2 = fb.group({
      'verifyCode': ['', Validators.compose([Validators.required])],
    });

    this.frm3 = fb.group({
      'confirmPassword': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    }, {
      // Add validator for matching password and confirm password
      validator: EqualPasswordsValidator.validate('password', 'confirmPassword')
    });

    // Set shortcut for control that used in HTML files
    this.confirmPassword = this.frm3.controls['confirmPassword'];
    this.password = this.frm3.controls['password'];
    this.email = this.frm.controls['email'];
    this.verifyCode = this.frm2.controls['verifyCode'];
  }

  public onSubmitStep1(formValue: any): void {
    this.submitted = true;
    if (this.frm.valid) {

      this._auth.forgotPassword({
        email: formValue.email
      }).subscribe((resp) => {
      }, (err: any) => {
        this.submitted = false;
      }, () => {
        this.currentStep = 2;
      })
      // your code goes here
      // console.log(values);
    }
  }

  public onSubmitStep2(formValue: any): void {
    this.submitted = true;
    if (this.frm.valid) {
      this._auth.verifyCode({
        email: this.frm.value.email,
        code: formValue.verifyCode
      }).subscribe((resp) => {
        // this._toast.success("Your password has successful reset", "Success");
        // this._router.navigate(['page', 'login']);
        this.currentStep = 3;
      }, (err: any) => {
        this.submitted2 = false;
      });
      // your code goes here
      // console.log(values);
    }
  }

  public onSubmitStep3(formValue: any): void {
    this.submitted3 = true;
    if (this.frm.valid) {
      let data = {
        "password": formValue.password,
        email: this.frm.value.email,
        code: this.frm2.value.verifyCode
      };
      this.submitted3 = true;
      this._auth.resetPassword(data).subscribe((resp) => {
        this._auth.setToken(resp.data);
        // Add automatically grant token after expiring
        this._auth.refreshToken();

        this._auth.getUserInfo().then((response: ApiResponse<any>) => {
        });

        this._router.navigate(['app', 'portfolio']);
      }, (err) => {
        this.submitted3 = false;
      })
    }
  }
}