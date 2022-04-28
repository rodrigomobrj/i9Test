import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyDataComponent} from "./components/my-data/my-data.component";

const routes: Routes = [
  {path: '', component: MyDataComponent},
  {path: ':id', component: MyDataComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyDataRoutingModule {}
