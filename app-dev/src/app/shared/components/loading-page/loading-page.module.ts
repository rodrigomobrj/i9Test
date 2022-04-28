import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingPageComponent} from "./loading-page.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [LoadingPageComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingPageComponent]
})
export class LoadingPageModule { }
