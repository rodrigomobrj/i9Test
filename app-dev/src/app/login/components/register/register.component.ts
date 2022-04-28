import { PersonRequest } from '../../../shared/models/person/person-request.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {passwordValidator} from "../../../shared/validators/password.validator";
import {isTouchedAndInvalidUtil} from "../../../shared/utils/isTouchedAndInvalid.util";
import { comparingEmail } from 'src/app/shared/validators/comparingEmail';
import { comparingPassword } from 'src/app/shared/validators/comparingPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      fullName: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.min(10)]],
      email: [null, [Validators.required, Validators.email]],
      emailConfirm: [null, [Validators.required, Validators.email]],
      password: [null, [passwordValidator, Validators.required]],
      passwordConfirm: [null, [passwordValidator, Validators.required]],
    }, {validators: [comparingPassword, comparingEmail]});
  }

  createObjectToBackEnd(formValue: any): PersonRequest {
    return {
      fullName: formValue.fullName,
      phone: formValue.phone,
      email: formValue.email,
      password: formValue.password
    }
  }

  passObjasParams(obj: any) {
    const person = JSON.stringify(obj)
    this.router.navigate(['terms/'], {queryParams: {person: btoa(person)}});
  }

  saveForm() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const persons = this.createObjectToBackEnd(formValue);
      this.passObjasParams(persons);
    }
  }

  isTouchedAndInvalid(formControl: string) {
    return isTouchedAndInvalidUtil(formControl, this.form);
  }
}
