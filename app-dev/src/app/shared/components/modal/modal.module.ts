import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from "./modal.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [ModalComponent],
    imports: [
        CommonModule,
        MatButtonModule,
    ],
  exports: [ModalComponent]
})
export class ModalModule { }
