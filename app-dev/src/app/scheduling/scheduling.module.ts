import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SchedulingRoutingModule} from "./scheduling-routing.module";
import {SchedulingComponent} from "./components/scheduling/scheduling.component";
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
import {TagHourComponent} from "./components/tag-hour/tag-hour.component";



@NgModule({
  declarations: [SchedulingComponent, TagHourComponent],
  imports: [
    CommonModule,
    SchedulingRoutingModule,
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
export class SchedulingModule { }
