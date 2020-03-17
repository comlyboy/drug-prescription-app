import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

import { IPrescription } from '../interfaces/prescription';
import { NotificationService } from '../shared/service/notification.service';
import { IPatient } from '../interfaces/patient';
import { IDrug } from '../interfaces/drug';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private API_URL = environment.API_URL;

  prescriptions: IPrescription[] = [];


  constructor(
    private http: HttpClient,
    public notificationService: NotificationService
  ) { }


  addPrescription(
    formula: string,
    duration: string,
    drugId: string,
    patientId: string
  ) {
    const prescriptionOBJ: IPrescription = {
      _id: null,
      formula,
      duration,
      drugId,
      patientId
    };

    this.http
      .post(
        `${this.API_URL}prescription`, prescriptionOBJ)
      .subscribe(() => {
        this.notificationService.success('Added successfully');
        setTimeout(() => {
          this.getPrescriptions();
        }, 800);
      });
  }



  private prescriptionsUpdated = new Subject<{
    prescriptions: IPrescription[],
    totalPrescriptions: number
  }>();

  getPrescriptionsUpdateListener() {
    return this.prescriptionsUpdated.asObservable();
  }

  getPrescriptions() {
    this.http
      .get<{
        prescriptions: IPrescription[];
        totalPrescriptions: number;
      }>(`${this.API_URL}prescription`)
      .subscribe(prescriptionData => {
        this.prescriptions = prescriptionData.prescriptions;
        this.prescriptionsUpdated.next({
          prescriptions: [...this.prescriptions],
          totalPrescriptions: prescriptionData.totalPrescriptions
        });
      });
  }

  getPrescriptionDetails(prescriptionId: string) {
    return this.http.get<{
      prescription: IPrescription,
      patient: IPatient,
      drug: IDrug,
      doctor: IUser
    }>(`${this.API_URL}prescription/${prescriptionId}`);
  }

  updatePrescription(
    prescriptionId: string,
    formula: string,
    duration: string,
    drugId: string,
    patientId: string
  ) {

    const prescriptionForEdit: IPrescription = {
      formula,
      duration,
      drugId,
      patientId
    };
    this.http
      .put(`${this.API_URL}prescription/${prescriptionId}`, prescriptionForEdit)
      .subscribe((result: any) => {
        this.notificationService.smallSuccess(result.message);
      });
  }

  deletePrescription(prescriptionId: string) {
    return this.http.delete(`${this.API_URL}prescription/${prescriptionId}`);
  }

}
