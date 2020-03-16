import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPatient } from '../interfaces/patient';
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private API_URL = environment.API_URL;

  patients: IPatient[] = [];

  constructor(
    private http: HttpClient,
    public notificationService: NotificationService
  ) { }

  // ===========
  addPatient(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    address: string
  ) {
    const patientOBJ: IPatient = {
      _id: null,
      firstName,
      lastName,
      age,
      gender,
      address
    };
    this.http
      .post(
        `${this.API_URL}patient`, patientOBJ)
      .subscribe(() => {
        this.notificationService.success('Added successfully');
        this.getPatients();
      });
  };


  // ==============
  private patientsUpdated = new Subject<{
    patients: IPatient[],
    totalPatients: number
  }>();

  getPatientsUpdateListener() {
    return this.patientsUpdated.asObservable();
  }

  getPatients() {
    this.http
      .get<{
        patients: IPatient[];
        totalPatients: number;
      }>(`${this.API_URL}patient`)
      .subscribe(patientsData => {
        this.patients = patientsData.patients;
        this.patientsUpdated.next({
          patients: [...this.patients],
          totalPatients: patientsData.totalPatients
        });
      });
  };

  getPatients2() {
    return this.http.get<{
      patients: IPatient[]
    }>(`${this.API_URL}patient`)
  }

  getPatientDetails(patientId: string) {
    return this.http.get(`${this.API_URL}patient/${patientId}`);
  }


  updatePatient(
    patientId: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    address: string
  ) {

    const patientForEdit: IPatient = {
      firstName,
      lastName,
      age,
      gender,
      address
    };
    this.http
      .put(`${this.API_URL}patient/${patientId}`, patientForEdit)
      .subscribe((result: any) => {
        this.notificationService.smallSuccess(result.message);
        this.getPatients();
      });
  }


  // Deleting customer
  deletePatient(patientId: string) {
    return this.http.delete(`${this.API_URL}patient/${patientId}`);
  }



}
