import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsDetailsComponent } from './components/appointments-detail/appointments-detail.component';
import {FaceToFaceAppointmentListComponent} from "./components/face-to-face-appointment-list/face-to-face-appointment-list.component";

const routes: Routes = [
  {path: ':id', component: FaceToFaceAppointmentListComponent},
  {path: 'details/:typeProfile/:profileId/:surgeryId', component: AppointmentsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingFacetofaceConsultationsRoutingModule { }
