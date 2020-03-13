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


  addPatient(
    name: string,
    description: string
  ) {
    const patientOBJ = {
      _id: null,
      name,
      description
    };

    this.http
      .post(
        `${this.API_URL}patient`, patientOBJ)
      .subscribe(() => {
        this.notificationService.success('Added successfully');
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

  getPatientDetails(patientId: string) {
    return this.http.get<IPatient>(`${this.API_URL}patient/${patientId}`);
  }


  updatePatient(
    _id: string,
    name: string,
    description: string
  ) {
    const patientForEdit = {
      _id,
      name,
      description
    };
    this.http
      .put(`${this.API_URL}patient/${_id}`, patientForEdit)
      .subscribe((result: any) => {
        this.notificationService.smallSuccess(result.message);
      });
  }


  // Deleting customer
  deletePatient(patientId: string) {
    this.notificationService.success('Deleted Successfully');
    return this.http.delete(`${this.API_URL}patient/${patientId}`);
  }



}
