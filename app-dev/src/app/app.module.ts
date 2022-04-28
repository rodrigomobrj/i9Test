import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaskModule} from "ngx-mask";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationInterceptor} from "./core/interceptors/authentication.interceptor";


import {registerLocaleData} from "@angular/common";
import localPt from '@angular/common/locales/pt';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FileOpener} from "@ionic-native/file-opener/ngx";

registerLocaleData(localPt);

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      IonicModule.forRoot(),
      NgxMaskModule.forRoot(),
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule,
    ],
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
      {provide: LOCALE_ID, useValue: 'pt-BR'},
      FileOpener,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
