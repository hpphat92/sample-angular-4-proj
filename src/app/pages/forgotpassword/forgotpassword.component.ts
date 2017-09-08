import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppConstant } from "../../app.constant";
import { AuthService } from "app/shared/services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";
import { ApiResponse } from "app/shared/models";
import { LocalStorageService } from "angular-2-local-storage";
import { TranslateService } from '@ngx-translate/core';

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
              private _translate: TranslateService,
              private _toast: ToastrService,
              private _localStorage: LocalStorageService) {
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

  /**
   * Create key from email to store expired time to storage
   * @param email
   * @private
   */
  private _buildStorageKeyFromEmail(email): string {
    return `__expired__${email}__`;
  }

  public isEmailInvalidFromStorage(email) {
    let time = this._localStorage.get(this._buildStorageKeyFromEmail(email));
    return time ? (+time - Date.now()) : 0;
  }

  public showMessageInvalidTime(email) {
    let invalidTimeRange = this.isEmailInvalidFromStorage(email);
    if (invalidTimeRange <= 0) {
      this._localStorage.remove(this._buildStorageKeyFromEmail(email));
      return false;
    }
    let nMins = (~~(invalidTimeRange / 60000));
    if (nMins > 0) {
      this._translate.get('error.account_blocked_minutes').subscribe((msg: string) => {
        msg = msg.replace('{nMins}', `${nMins}`);
        this._toast.error(msg);
      });
    } else {
      this._translate.get('error.account_blocked_seconds').subscribe((msg: string) => {
        msg = msg.replace('{nSecs}', `${~~(invalidTimeRange / 1000)}`);
        this._toast.error(msg);
      });
    }
    return true;
  }

  public onSubmitStep1(formValue: any): void {
    if (this.frm.valid) {
      if (this.showMessageInvalidTime(formValue.email)) {
        this.frm.enable();
        return;
      }
      this.submitted = true;
      this._auth.forgotPassword({
        email: formValue.email
      }).subscribe((resp) => {
      }, (err: any) => {
        this.submitted = false;
      }, () => {
        this.frm.enable();
        this.currentStep = 2;
      })
      // your code goes here
      // console.log(values);
    }
  }

  public onSubmitStep2(formValue: any): void {
    this.submitted = true;
    if (this.frm.valid) {
      if (this.showMessageInvalidTime(this.frm.value.email)) {
        this.frm.enable();
        return;
      }
      this._auth.verifyCode({
        email: this.frm.value.email,
        code: formValue.verifyCode
      }).map((data) => {
      }).subscribe((resp) => {
        // this._toast.success("Your password has successful reset", "Success");
        // this._router.navigate(['page', 'login']);
        this.currentStep = 3;
      }, (err: any) => {
        err = err.json();
        this.frm2.enable();
        this.submitted2 = false;
        if (err.data) {
          this._localStorage.set(this._buildStorageKeyFromEmail(this.frm.value.email), err.data.blockTo);
          this.showMessageInvalidTime(this.frm.value.email);
        } else {
          this._toast.error(err.message || `${err.status} ${(err as any).statusText}`, "Error");
        }
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
