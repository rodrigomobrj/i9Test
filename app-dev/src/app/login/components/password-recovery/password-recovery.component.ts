import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/validators/passwordValidator';
import { comparingPassword } from 'src/app/shared/validators/comparingPassword';
import { isTouchedAndInvalidUtil } from 'src/app/shared/utils/isTouchedAndInvalid.util';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SmsResponseModel} from "../../models/smsResponse.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SmsService} from "../../services/sms/sms.service";
import {Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../../../shared/services/user/user.service";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {

  form: FormGroup;
  showModalSms = false;
  smsNumber: number;
  credentials;
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private smsService: SmsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, passwordValidator],
      passwordConfirm: [null, passwordValidator],
    }, {validator: comparingPassword})
  }

  isTouchedAndInvalid(formControl: string) {
    return isTouchedAndInvalidUtil(formControl, this.form);
  }

  showAndHideModalSMS() {
    this.showModalSms = !this.showModalSms;
  }

  saveNewPassword() {
    if(this.form.valid) {
      this.credentials = this.form.getRawValue();
      this.showAndHideModalSMS();
      this.validateBySms();
    }
  }

  validateBySms() {
    const login = this.credentials.login;
    this.smsService.sendSMSValidate(login).subscribe(
      (smsResponse: SmsResponseModel) => {
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 2000});
        this.loading = false;
      }
    );
  }

  confirmCode(code: string) {
    this.loading = true;
    this.showAndHideModalSMS();
    this.userService.recoveryPassword(
      this.credentials.login, this.credentials.password, code
    ).subscribe(
      response => {
        this.router.navigate(['']).then();
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.showAndHideModalSMS();
        this.snackBar.open('Código incorreto.', 'Ok', {duration: 2000});
      }
    )
  }

  resendSms() {
    this.validateBySms();
  }

}
