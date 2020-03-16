import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPatient } from '../interfaces/patient';
import { PatientService } from './patient.service';
import { Subscription } from 'rxjs';
import { DialogService } from '../shared/service/dialog.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  viewMode = 'list';

  patient: IPatient;
  patients: IPatient[] = [];
  totalPatients: number = 0;

  patientSub: Subscription;

  constructor(
    public dialogService: DialogService,
    private patientService: PatientService
  ) { };


  onDeleteDialog(patientId: string) {
    this.dialogService.patientDeleteDialog(patientId);
  }


  onSubmitPatientEdit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.patientService.updatePatient
      (
        this.patient._id,
        form.value.inputFirstName,
        form.value.inputLastName,
        form.value.inputAge,
        form.value.inputGender,
        form.value.inputAddress
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  }


  onEditPatientMode(patientId: string) {
    this.patientService.getPatientDetails(patientId)
      .subscribe((patientData: { patient: IPatient }) => {
        this.patient = patientData.patient;
      });
    this.viewMode = "edit"
  }


  onSubmitPatient(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.patientService.addPatient
      (
        form.value.inputFirstName,
        form.value.inputLastName,
        form.value.inputAge,
        form.value.inputGender,
        form.value.inputAddress
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  }



  initContents() {
    this.patientService.getPatients();
    this.patientSub = this.patientService.getPatientsUpdateListener()
      .subscribe((patientData: { patients: IPatient[]; totalPatients: number; }) => {
        this.patients = patientData.patients;
        this.totalPatients = patientData.totalPatients;
      })
  }

  ngOnInit() {
    this.initContents();
  }

}
