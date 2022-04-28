import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewSurgeryListComponent} from "./components/new-surgery-list/new-surgery-list.component";
import {SurgeryDetailComponent} from "./components/surgery-detail/surgery-detail.component";


const routes: Routes = [
  {path: '', component: NewSurgeryListComponent},
  {path: 'detail/:id', component: SurgeryDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class newSurgeryRoutingModule {}
