import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { IonicModule } from '@ionic/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavbarModule } from '../core/components/navbar/navbar.module';
import { TitleModule } from '../shared/components/title/title.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {MatSelectModule} from '@angular/material/select';
import { ModalModule } from '../shared/components/modal/modal.module';
import { HomePaymentComponent } from './components/home-payment/home-payment.component';

@NgModule({
  declarations: [CreditCardComponent, HomePaymentComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NavbarModule,
    TitleModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatSelectModule,
    ModalModule
  ]
})
export class PaymentsModule { }
