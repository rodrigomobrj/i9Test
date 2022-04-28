import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { HomePaymentComponent } from './components/home-payment/home-payment.component';

const routes: Routes = [
  {path: 'home/:typeService', component: HomePaymentComponent},
  {path: ':typeService/:formPayment', component: CreditCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
