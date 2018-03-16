import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {isValidNumber} from "libphonenumber-js";
import {Subject} from "rxjs/Subject";

export function malaysianPhoneNumberValidator(): ValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let subject = new Subject<any>();
    let valid = isValidNumber(control.value, 'MY');
    if(valid){
      subject.next(null);
    }else{
      subject.error('not valid');
    }
    return subject.asObservable();
  }
}