import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "../../services/login/login.service";
import {AuthenticationService} from "../../../core/services/authentication/authentication.service";
import {AuthenticationModel} from "../../models/authentication.model";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AvailableResult, BiometryType, Credentials, NativeBiometric} from "capacitor-native-biometric";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorLogin: boolean = false;
  disabledLoginButton = false;
  loadingPage = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.availableBiometric();
  }

  createForm() {
    this.form = this.fb.group({
      login: [null, Validators.required,],
      password: [null, Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      this.errorLogin = false;
      this.disabledLoginButton = true;
      const credentials = this.form.getRawValue();
      this.loginService.authentication(credentials.login, credentials.password).subscribe(
        (response) => {
          this.eventAuthenticationService(response.data);
          this.saveBiometric(credentials.login, credentials.password);
        },
        (error: HttpErrorResponse) => {
          this.errorLogin = true;
          this.disabledLoginButton = false;
        }
      );
    } else {
      this.errorLogin = true;
    }
  }

  eventAuthenticationService(response: AuthenticationModel) {
    this.authenticationService.setInspirationDate(response.expiresIn).pipe(
      map(() => this.authenticationService.setToken(response.token)),
      map(() => this.authenticationService.setUserId(response.userCode))
    ).subscribe(() => {
      this.disabledLoginButton = false;
      this.router.navigate(['main','scheduled-performed-surgeries']).then();
    });
  }

  availableBiometric() {
    NativeBiometric.isAvailable().then(
      (result: AvailableResult) => {
        const isAvailable = result.isAvailable;
        const isFaceId = result.biometryType == BiometryType.FACE_ID;

        if (isAvailable) {
          // Get user's credentials
          NativeBiometric.getCredentials({
            server: environment.api,
          }).then((credentials: Credentials) => {
            // Authenticate using biometrics before logging the user in
            NativeBiometric.verifyIdentity({
              reason: "Para facilitar o login",
              title: "I9 Cirurgias",
              subtitle: "Desbloqueie seu app",
            }).then(
              () => {
                // Authentication successful
                this.loadingPage = true;
                this.loginService.authentication(credentials.username, credentials.password).subscribe(
                  (response) => {
                    this.loadingPage = false;
                    this.eventAuthenticationService(response.data);
                  },
                  (error: HttpErrorResponse) => {
                    this.loadingPage = false;
                    this.errorLogin = true;
                    this.disabledLoginButton = false;
                  }
                );
              },
              (error) => {
                // Failed to authenticate
                // alert('Falha na autenticação. Por favor, logar sem ser por digital.');
              }
            );
          });
        }
      },
      (error) => {
        // Couldn't check availability
      }
    );
  }

  saveBiometric(login, password) {
    NativeBiometric.setCredentials({
      username: login,
      password: password,
      server: environment.api,
    }).then();
  }
}
