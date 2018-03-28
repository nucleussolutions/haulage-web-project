import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {isValidNumber} from "libphonenumber-js";
import {Subject} from "rxjs/Subject";

export function malaysianPhoneNumberValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let valid = isValidNumber(control.value, 'MY');
    console.log('isValidNumber ' + valid);
    return Observable.of(isValidNumber(control.value, 'MY')).map(valid => valid ? null : {myPhoneValid: true});
  }
}