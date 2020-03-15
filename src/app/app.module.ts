import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './shared/material/material.module';

import { AuthGuard } from './auth/auth-guard';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthComponent } from './auth/auth.component';

import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionDetailsComponent } from './prescription/prescription-details/prescription-details.component';

import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './shared/error/error-interceptor';

import { HeaderComponent } from './shared/components/header/header.component';

import { DrugComponent } from './drug/drug.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrescriptionComponent,
    PrescriptionDetailsComponent,
    AuthComponent,
    PatientComponent,
    PatientDetailsComponent,
    HeaderComponent,
    DrugComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
