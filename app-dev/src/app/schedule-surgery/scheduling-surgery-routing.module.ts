import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalSearchComponent } from './components/hospital-search/hospital-search.component';


const routes: Routes = [
  {path: 'hospital/:surgeonId', component: HospitalSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingSurgeryRoutingModule { }
