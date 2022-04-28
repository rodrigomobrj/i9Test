import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduledPerformedSurgeriesComponent} from "./components/scheduled-performed-surgeries/scheduled-performed-surgeries.component";
import {ScheduledDetailComponent} from "./components/scheduled-detail/scheduled-detail.component";
import {PatientDetailComponent} from "./components/patient-detail/patient-detail.component";
import {NurseDetailComponent} from "./components/nurse-detail/nurse-detail.component";
import {DoctorDetailComponent} from "./components/doctor-detail/doctor-detail.component";


const routes: Routes = [
  {path: '', component: ScheduledPerformedSurgeriesComponent},
  {
    path: 'detail/:id',
    component: ScheduledDetailComponent,
    children:[
      {path: 'patient/:id', component: PatientDetailComponent},
      {path: 'nurse/:id', component: NurseDetailComponent},
      {path: 'doctor/:id', component: DoctorDetailComponent}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ScheduledPerformedSurgeriesRoutingModule {}
