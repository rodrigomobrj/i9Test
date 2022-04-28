import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchedulingComponent} from "./components/scheduling/scheduling.component";
import {schedulingEnum} from "./enum/scheduling.enum";

const routes: Routes = [
  {path: `${schedulingEnum.online}/:surgeryCode`, component: SchedulingComponent},
  {path: `${schedulingEnum.facetoface}/:typeProfile/:profileCode/:surgeryCode`, component: SchedulingComponent},
  {path: `${schedulingEnum.surgery}`, component: SchedulingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingRoutingModule { }
