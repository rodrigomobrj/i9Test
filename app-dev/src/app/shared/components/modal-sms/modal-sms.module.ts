import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalSmsComponent} from "./modal-sms.component";
import {ModalModule} from "../modal/modal.module";
import {MatButtonModule} from "@angular/material/button";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [ModalSmsComponent],
  imports: [
    CommonModule,
    ModalModule,
    MatButtonModule,
    IonicModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [ModalSmsComponent]
})
export class ModalSmsModule { }
