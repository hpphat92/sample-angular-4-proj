import { FormGroup } from '@angular/forms';

export class EqualPasswordsValidator {

  public static validate(firstField, secondField) {

    return (c: FormGroup) => {
      return c.controls[secondField].setErrors({
        passwordsEqual: (c.controls && c.controls[firstField].value == c.controls[secondField].value)
      });
    }
  }
}
