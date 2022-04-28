import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu.component";


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: "new-surgery",
        loadChildren: () => import('../../../new-surgery/new-surgery.module').then(m => m.NewSurgeryModule)
      },
      {
        path: "my-data",
        loadChildren: () => import('../../../my-data/my-data.module').then(m => m.MyDataModule)
      },
      {
        path: 'scheduled-performed-surgeries',
        loadChildren: () => import('../../../scheduled-performed-surgeries/scheduled-performed-surgeries.module').then(m => m.ScheduledPerformedSurgeriesModule)
      },
      {
        path: 'risk-classification',
        loadChildren: () => import('../../../risk-classification/risk-classification.module').then(m => m.RiskClassificationModule)
      },
      {
        path: 'scheduling-facetoface-consultations',
        loadChildren: () => import('../../../scheduling-facetoface-consultations/scheduling-facetoface-consultations.module').then(m => m.SchedulingFacetofaceConsultationsModule)
      },
      {
        path: 'scheduling',
        loadChildren: () => import('../../../scheduling/scheduling.module').then(m => m.SchedulingModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../../../payments/payments.module').then(m => m.PaymentsModule)
      },
      {
        path: 'schedule-surgery',
        loadChildren: () => import('../../../schedule-surgery/scheduling-surgery.module').then(m => m.SchedulingSurgeryModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
