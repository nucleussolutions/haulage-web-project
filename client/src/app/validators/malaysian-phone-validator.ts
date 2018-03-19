import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {isValidNumber} from "libphonenumber-js";
import {Subject} from "rxjs/Subject";

export function malaysianPhoneNumberValidator(): ValidatorFn{
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let subject = new Subject<any>();
    let valid = isValidNumber(control.value, 'MY');
    if(valid){
      console.log('valid phone number');
      subject.next(null);
    }else{
      console.log('invalid phone number');
      subject.error('not valid');
    }
    return subject.asObservable();
  }
}