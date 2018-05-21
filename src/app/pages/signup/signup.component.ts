import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from "ngx-toastr";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppConstant } from "../../app.constant";
import { AuthService, Util } from "../../shared/services";
import { ApiResponse } from "../../shared/models/api-response.model";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";
import { TermAndConditionsComponent } from './terms-conditions';

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {

  public frm: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public companyName: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;
  public submitted: boolean = false;
  public settingKey: string = 'Terms & Conditions';

  constructor(private fb: FormBuilder,
              private _auth: AuthService,
              private _toast: ToastrService,
              private _util: Util,
              private _modalService: NgbModal,
              private _router: Router) {
    this.frm = fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'companyName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
      'agreedTermsAndConditions': [false, [Validators.requiredTrue]]
    }, {
      validator: EqualPasswordsValidator.validate('password', 'confirmPassword')
    });

    this.firstName = this.frm.controls['firstName'];
    this.lastName = this.frm.controls['lastName'];
    this.companyName = this.frm.controls['companyName'];
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

        this._router.navigate(['app', 'portfolio']);

      }, (err: ApiResponse<any>) => {
        this.submitted = false;
        this.frm.enable();
      });
    }
  }

  public showTermsAndConditions(): void {
    let params = this._util.objectToURLSearchParams({key: this.settingKey});
    this._auth.getTermsAndConditions().subscribe(resp => {
      if(resp.status) {
        let modalRef = this._modalService.open(TermAndConditionsComponent, 
          {backdrop: 'static', size: 'lg', keyboard: false});
        modalRef.componentInstance.termsAndConditions = resp.data.value;
        modalRef.result.then(isSuccess => {
        }, (err) => {
        });
      } else {
        this._toast.error(resp.message, 'Error');
      }
    });
  }
}
