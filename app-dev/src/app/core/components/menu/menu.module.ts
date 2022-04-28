import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu.component";
import {MenuRoutingModule} from "./menu-routing.module";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    IonicModule,
    RouterModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
