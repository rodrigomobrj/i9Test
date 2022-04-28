import { FormControl } from '@angular/forms';

export function passwordValidator(control: FormControl) : {[s: string] : boolean} {
  
    const value = control.value;
    const regex = /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-zA-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;

    // verifica se tem pelo menos 8 caracteres, um caractere especial, uma letra e um número
    if(!regex.test(value)) {
      return { passwordError: true };
    }

    // verifica se tem ao menos uma letra maiúscula
    if(!value.match(/[A-Z]{1,}/)) {
      return { passwordError: true };
    }

    return null;
}
