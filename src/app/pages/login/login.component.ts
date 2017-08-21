import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AppConstant } from "../../app.constant";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public frm:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    this.frm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(AppConstant.pattern.email)])],
      'password': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      'rememberMe': ['']
    });

    this.email = this.frm.controls['email'];
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
