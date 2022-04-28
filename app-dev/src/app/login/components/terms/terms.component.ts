import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person/person.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {filter, map, switchMap} from 'rxjs/operators';
import { PersonRequest } from '../../../shared/models/person/person-request.model';
import {SmsResponseModel} from "../../models/smsResponse.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SmsService} from "../../services/sms/sms.service";
import {LoginService} from "../../services/login/login.service";
import {AuthenticationModel} from "../../models/authentication.model";
import {AuthenticationService} from "../../../core/services/authentication/authentication.service";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit, OnDestroy {

  termUserData: boolean;
  termUserPrivacy: boolean;
  modalConfirm: boolean = false;
  person: PersonRequest;
  subscriptions: Subscription[] = [];
  smsNumber: number;
  loading = false;

  constructor(
    private router: Router,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private smsService: SmsService,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getObjectParams();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getObjectParams() {
    const subscription = this.route.queryParams.pipe(
      filter(params => params.person)
    ).subscribe(params => {
        const encryptedPerson = atob(params.person);
        this.person = JSON.parse(encryptedPerson);
      }
    );
    this.subscriptions.push(subscription);
  }

  createPerson() {
    this.loading = true;
    const subscription = this.personService.createPersons(this.person).subscribe(
      (response: any) => {
        this.loading = false;
        this.modalConfirm = true;
      },
      (error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao cadastrar usuário, tente novamente';
        if(error.status == 409) {
          errorMessage = error.error.message;
        }
        this.snackBar.open(errorMessage, 'OK', {duration: 3000});
        this.router.navigate(['register']).then();
        this.loading = false;
      }
    );
    this.subscriptions.push(subscription);
  }

  resendSms() {
    const phoneNumber = this.person.phone;
    this.smsService.sendSMSValidate(phoneNumber).subscribe(
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
    this.smsService.confirmCreationSms(this.person.phone, code).pipe(
      switchMap(() =>
        this.loginService.authentication(this.person.email, this.person.password)
      ),
    ).subscribe(
      (response) => {
        this.eventAuthenticationService(response.data);
      },
      error => {
        this.snackBar.open('Código incorreto.', 'Ok', {duration: 2000});
      }
    )
  }

  eventAuthenticationService(response: AuthenticationModel) {
    const subscription = this.authenticationService.setInspirationDate(response.expiresIn).pipe(
      map(() => this.authenticationService.setToken(response.token)),
      map(() => this.authenticationService.setUserId(response.userCode)),
    ).subscribe(() => {
      this.router.navigate(['main','new-surgery']).then();
    });
    this.subscriptions.push(subscription);
  }

}
