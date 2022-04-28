import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalInfosComponent } from './components/additional-infos/additional-infos.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {path: 'questions/:typePage/:id', component: QuestionsComponent},
  {path: 'additional-infos/:typePage/:id', component: AdditionalInfosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskClassificationRoutingModule { }
