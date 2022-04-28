import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnlineConsultationComponent} from "./components/online-consultation/online-consultation.component";

const routes: Routes = [
  {path: 'consultation/:id', component: OnlineConsultationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class onlineSchedulingRoutingModule { }
