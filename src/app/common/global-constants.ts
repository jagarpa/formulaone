import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class GlobalConstants {

  public static passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

}
