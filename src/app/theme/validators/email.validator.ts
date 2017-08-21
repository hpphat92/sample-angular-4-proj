import { AbstractControl } from '@angular/forms';

export class EmailValidator {

  public static validate(c:AbstractControl) {
    let EMAIL_REGEXP = /^[A-Za-z0-9]+([\\._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([\\.-][A-Za-z0-9]+)*(\\.[A-Za-z]{2,4})$/;

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}
