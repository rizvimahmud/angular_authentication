import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      const targetControl = control.get(target);

      return sourceControl &&
        targetControl &&
        sourceControl.value !== targetControl.value
        ? { mismatch: true }
        : null;
    };
  }
}
