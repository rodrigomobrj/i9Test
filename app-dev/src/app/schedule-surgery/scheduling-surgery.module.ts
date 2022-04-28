import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulingSurgeryRoutingModule } from './scheduling-surgery-routing.module';
import { IonicModule } from '@ionic/angular';
import { HospitalSearchComponent } from './components/hospital-search/hospital-search.component';
import { TitleModule } from '../shared/components/title/title.module';
import { NavbarModule } from '../core/components/navbar/navbar.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { LoadingPageModule } from '../shared/components/loading-page/loading-page.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [HospitalSearchComponent],
  imports: [
    CommonModule,
    SchedulingSurgeryRoutingModule,
    IonicModule,
    NavbarModule,
    TitleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskModule,
    LoadingPageModule,
    MatListModule
  ]
})
export class SchedulingSurgeryModule { }
