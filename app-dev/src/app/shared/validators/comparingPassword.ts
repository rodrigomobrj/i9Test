import { FormGroup } from '@angular/forms';

export function comparingPassword(form: FormGroup) : {[s: string] : boolean} {
  const password = form.get('password').value;
  const passwordConfirm = form.get('passwordConfirm').value;
  if(password != passwordConfirm) {
    return {comparingPasswordError: true};
  }
  return null
};


