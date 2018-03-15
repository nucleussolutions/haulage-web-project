import {AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CompanyService} from "./company/company.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

// export function companyRegNoValidator(userObject: any, companyService: CompanyService) : AsyncValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     let subject = new Subject<ValidationErrors | null>();
//     console.log('companyRegNoValidator userObject '+JSON.stringify(userObject));
//     if(control.value.length > 2){
//       companyService.searchByRegNo(control.value, userObject).map(value => {
//         console.log('results found '+JSON.stringify(value));
//         subject.next({
//           message: 'company registration number exists'
//         });
//       }, error => {
//         console.log('results not found');
//         subject.next(null);
//       });
//     }
//     return subject.asObservable();
//   }
// }