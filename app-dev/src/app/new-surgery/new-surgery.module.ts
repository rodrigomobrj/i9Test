import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {newSurgeryRoutingModule} from "./new-surgery-routing.module";
import {NewSurgeryListComponent} from "./components/new-surgery-list/new-surgery-list.component";
import { IonicModule } from '@ionic/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TitleModule } from '../shared/components/title/title.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import {NavbarModule} from "../core/components/navbar/navbar.module";
import {SurgeryDetailComponent} from "./components/surgery-detail/surgery-detail.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [NewSurgeryListComponent, SurgeryDetailComponent],
    imports: [
        CommonModule,
        newSurgeryRoutingModule,
        IonicModule,
        MatFormFieldModule,
        MatInputModule,
        TitleModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        ReactiveFormsModule,
        NavbarModule,
        MatProgressSpinnerModule
    ]
})
export class NewSurgeryModule { }
