import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";

@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.scss']
})
export class ForgotPassword {

  public frm:FormGroup;
  public email:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    this.frm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
    });

    this.email = this.frm.controls['email'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.frm.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
