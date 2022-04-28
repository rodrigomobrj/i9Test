import {FormControl} from "@angular/forms";

export function dateValidator(control: FormControl): { [s: string]: boolean } {
  const dateString = control.value;
  if (!dateString) {
    return { dateInvalid: true };
  }
  if (dateString.length != 8) {
    return { dateInvalid: true };
  }
  return null;
}
