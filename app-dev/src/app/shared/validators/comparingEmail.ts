import { FormGroup } from "@angular/forms";

export function comparingEmail(form: FormGroup): { [s: string]: boolean } {
  const email = form.get('email').value;
  const emailConfirm = form.get('emailConfirm').value;
  if (email != emailConfirm) {
    return { comparingEmailError: true };
  }
  return null;
}
