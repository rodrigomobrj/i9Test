import {FormControl, FormGroup} from "@angular/forms";

export const isTouchedAndInvalidUtil = (formControlName: string, form: FormGroup) => {
  return form.get(formControlName).touched && form.get(formControlName).invalid;
};

export const isTouchedAndInvalidUtilFormControl = (control: FormControl) => {
  return control.touched && control.invalid;
};
