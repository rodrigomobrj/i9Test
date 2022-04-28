import {FormControl} from "@angular/forms";
import * as moment from 'moment';
import {parseDateToBackUtil} from "../utils/parseDateToBackUtil";

export function dateSchedulingValidator(control: FormControl): { [s: string]: boolean } {
  const dateString = control.value;
  if (!dateString) {
    return { dateInvalid: true };
  }
  if (dateString.length != 8) {
    return { dateInvalid: true };
  }
  const now = moment();
  const dateInput = moment(parseDateToBackUtil(dateString), 'YYYY-MM-DD');
  if (dateInput >= now) {
    return null;
  }
  return {error: true};
}
