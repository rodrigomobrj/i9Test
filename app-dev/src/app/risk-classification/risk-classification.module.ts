import { LoadingPageModule } from './../shared/components/loading-page/loading-page.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarModule } from '../core/components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RiskClassificationRoutingModule } from './risk-classification-routing.module';
import { TitleModule } from '../shared/components/title/title.module';
import { QuestionsComponent } from './components/questions/questions.component';
import { ModalModule } from '../shared/components/modal/modal.module';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MultiselectPillsModule } from '../shared/components/multiselect-pills/multiselect-pills.module';
import { UploadFileModule } from '../shared/components/upload-file/upload-file.module';
import { AdditionalInfosComponent } from './components/additional-infos/additional-infos.component';
import { RiskRatingsService } from './services/risk-rating.service';

@NgModule({
  declarations: [QuestionsComponent, AdditionalInfosComponent],
  imports: [
    CommonModule,
    RiskClassificationRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TitleModule,
    NavbarModule,
    MatSlideToggleModule,
    ModalModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MultiselectPillsModule,
    UploadFileModule,
    LoadingPageModule
  ],
  providers: [RiskRatingsService]
})
export class RiskClassificationModule { }
