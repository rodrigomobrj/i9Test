import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScheduledPerformedSurgeriesRoutingModule} from "./scheduled-performed-surgeries-routing.module";
import {NavbarModule} from "../core/components/navbar/navbar.module";
import {TitleModule} from "../shared/components/title/title.module";
import {ScheduledPerformedSurgeriesComponent} from "./components/scheduled-performed-surgeries/scheduled-performed-surgeries.component";
import {MatLineModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {IonicModule} from "@ionic/angular";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {StatusModule} from "../shared/components/status/status.module";
import { ModalModule } from '../shared/components/modal/modal.module';
import { EvaluationStarsModule } from '../shared/components/evaluation-stars/evaluation-stars.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {LoadingPageModule} from "../shared/components/loading-page/loading-page.module";
import {MatTabsModule} from '@angular/material/tabs';
import {PatientDetailComponent} from "./components/patient-detail/patient-detail.component";
import {ScheduledDetailComponent} from "./components/scheduled-detail/scheduled-detail.component";
import {DoctorDetailComponent} from "./components/doctor-detail/doctor-detail.component";
import {NurseDetailComponent} from "./components/nurse-detail/nurse-detail.component";

@NgModule({
  declarations: [
    ScheduledPerformedSurgeriesComponent,
    PatientDetailComponent,
    ScheduledDetailComponent,
    DoctorDetailComponent,
    NurseDetailComponent,
  ],
  imports: [
    CommonModule,
    ScheduledPerformedSurgeriesRoutingModule,
    NavbarModule,
    TitleModule,
    MatLineModule,
    MatListModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    StatusModule,
    ModalModule,
    EvaluationStarsModule,
    MatSnackBarModule,
    LoadingPageModule,
    MatTabsModule,
  ]
})
export class ScheduledPerformedSurgeriesModule { }
