import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrescriptionDetailsComponent } from './prescription/prescription-details/prescription-details.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { AuthGuard } from './auth/auth-guard';
import { DrugComponent } from './drug/drug.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'auth', component: AuthComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'drugs', component: DrugComponent, canActivate: [AuthGuard] },

  { path: 'prescriptions', component: PrescriptionComponent, canActivate: [AuthGuard] },
  { path: 'prescriptions/:prescriptionId', component: PrescriptionDetailsComponent, canActivate: [AuthGuard] },

  { path: 'patients', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/:patientId', component: PatientDetailsComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'auth' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
