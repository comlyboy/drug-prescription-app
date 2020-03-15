import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

import { IPrescription } from '../interfaces/prescription';
import { NotificationService } from '../shared/service/notification.service';

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


  addPrescription(drugId: string) {
    // const drugOBJ: IPrescription = {
    //   _id: null,
    //   name,
    //   description
    // };
    // this.http
    //   .post(
    //     `${this.API_URL}prescription`, drugOBJ)
    //   .subscribe(() => {
    //     this.notificationService.success('Added successfully');
    //     this.getsPrescription();
    //   });
  }



  private prescriptionsUpdated = new Subject<{
    prescriptions: IPrescription[],
    totalPrescriptions: number
  }>();

  getprescriptionsUpdateListener() {
    return this.prescriptionsUpdated.asObservable();
  }

  getPrescription() {
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
    return this.http.get<IPrescription>(`${this.API_URL}patient/${prescriptionId}`);
  }

  updatePrescription(
    _id: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    address: string
  ) {

    // const patientForEdit: IPatient = {
    //   firstName,
    //   lastName,
    //   age,
    //   gender,
    //   address
    // };
    // this.http
    //   .put(`${this.API_URL}patient/${_id}`, patientForEdit)
    //   .subscribe((result: any) => {
    //     this.notificationService.smallSuccess(result.message);
    //   });
  }

  deletePrescription(prescriptionId: string) {
    return this.http.delete(`${this.API_URL}drug/${prescriptionId}`);
  }

}
