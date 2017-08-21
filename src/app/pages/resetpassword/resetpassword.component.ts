import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.html',
  styleUrls: ['./resetpassword.scss']
})
export class ResetPassword {

  public frm:FormGroup;
  public confirmPassword:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    this.frm = fb.group({
      'confirmPassword': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
    },{
      validator: EqualPasswordsValidator.validate('password','confirmPassword')
    });

    this.confirmPassword = this.frm.controls['confirmPassword'];
    this.password = this.frm.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.frm.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
