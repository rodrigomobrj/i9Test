import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WeakPasswordComponent } from './weak-password.component';



@NgModule({
  declarations: [WeakPasswordComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    IonicModule,
  ],
  exports: [WeakPasswordComponent]
})
export class WeakPasswordModule { }
