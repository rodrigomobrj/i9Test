import { ModalModule } from './../shared/components/modal/modal.module';
import { WeakPasswordModule } from './../shared/components/weak-password/weak-password.module';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from "./login-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { LoginService } from "./services/login/login.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsComponent } from './components/terms/terms.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {NgxMaskModule} from "ngx-mask";
import {MatButtonModule} from "@angular/material/button";
import {ModalSmsModule} from "../shared/components/modal-sms/modal-sms.module";
import {LoadingPageModule} from "../shared/components/loading-page/loading-page.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordRecoveryComponent, TermsComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        IonicModule,
        ReactiveFormsModule,
        WeakPasswordModule,
        MatCardModule,
        MatSlideToggleModule,
        FormsModule,
        ModalModule,
        MatProgressSpinnerModule,
        NgxMaskModule,
        MatButtonModule,
        ModalSmsModule,
        MatSnackBarModule,
        LoadingPageModule,
    ],
  providers: [LoginService]
})
export class LoginModule { }
