import { EvaluationStarsComponent } from './evaluation-stars.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [EvaluationStarsComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [EvaluationStarsComponent]
})
export class EvaluationStarsModule { }
