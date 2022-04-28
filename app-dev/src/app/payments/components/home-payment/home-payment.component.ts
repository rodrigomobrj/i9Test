import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-payment',
  templateUrl: './home-payment.component.html',
  styleUrls: ['./home-payment.component.scss'],
})
export class HomePaymentComponent implements OnInit, OnDestroy {

  surgeryCode: string;
  profileCode: string;
  subscriptions: Subscription[] = [];
  typeService: string;
  /*dados mocados */
  surgeryPayment: string = 'Importante: O valor a ser pago é referente à cirurgia e equipe médica.';
  appointmentsPayment: string = 'Importante: O valor a ser pago é referente a consulta e não a cirurgia.';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSurgeryAndProfileById();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getSurgeryAndProfileById() {
    const subscription = this.route.params.subscribe(
      params => {
        this.profileCode = params['profileId'];
        this.surgeryCode = params['surgeryId'];
        this.typeService = params['typeService'];
      }
    );
    this.subscriptions.push(subscription);
  }

  addCreditCard() {
    this.router.navigate(['main/payments', this.typeService, 'credit-card']).then();
  }


}
