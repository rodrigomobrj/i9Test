import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {onlineSchedulingRoutingModule} from "./online-scheduling-routing.module";
import {OnlineConsultationComponent} from "./components/online-consultation/online-consultation.component";
import {NavbarModule} from "../core/components/navbar/navbar.module";
import {TitleModule} from "../shared/components/title/title.module";
import {IonicModule} from "@ionic/angular";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgxMaskModule} from "ngx-mask";
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from "../shared/components/modal/modal.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [OnlineConsultationComponent],
  imports: [
    CommonModule,
    onlineSchedulingRoutingModule,
    NavbarModule,
    TitleModule,
    IonicModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule,
    ReactiveFormsModule,
    ModalModule,
    MatProgressSpinnerModule,
  ]
})
export class OnlineSchedulingModule { }
