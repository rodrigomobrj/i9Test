import { EvaluationStarsModule } from '../shared/components/evaluation-stars/evaluation-stars.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingFacetofaceConsultationsRoutingModule } from './scheduling-facetoface-consultations-routing.module';
import { NavbarModule } from '../core/components/navbar/navbar.module';
import { AppointmentsDetailsComponent } from './components/appointments-detail/appointments-detail.component';
import { TitleModule } from '../shared/components/title/title.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import {FaceToFaceAppointmentListComponent} from "./components/face-to-face-appointment-list/face-to-face-appointment-list.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {StatusModule} from "../shared/components/status/status.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingPageModule} from "../shared/components/loading-page/loading-page.module";


@NgModule({
  declarations: [AppointmentsDetailsComponent, FaceToFaceAppointmentListComponent],
  imports: [
    CommonModule,
    SchedulingFacetofaceConsultationsRoutingModule,
    NavbarModule,
    TitleModule,
    IonicModule,
    EvaluationStarsModule,
    MatSnackBarModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonModule,
    StatusModule,
    MatProgressSpinnerModule,
    LoadingPageModule,
  ]
})
export class SchedulingFacetofaceConsultationsModule { }
