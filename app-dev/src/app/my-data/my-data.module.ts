import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyDataComponent} from "./components/my-data/my-data.component";
import {NavbarModule} from "../core/components/navbar/navbar.module";
import {IonicModule} from "@ionic/angular";
import {MyDataRoutingModule} from "./my-data-routing.module";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from "ngx-mask";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TitleModule} from "../shared/components/title/title.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingPageModule} from "../shared/components/loading-page/loading-page.module";

@NgModule({
  declarations: [MyDataComponent],
    imports: [
        CommonModule,
        NavbarModule,
        IonicModule,
        MyDataRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgxMaskModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        TitleModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        LoadingPageModule,
    ],
})
export class MyDataModule { }
