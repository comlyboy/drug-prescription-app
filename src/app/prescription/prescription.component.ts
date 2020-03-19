import { Component, OnInit } from '@angular/core';
import { IPrescription } from '../interfaces/prescription';
import { PrescriptionService } from './prescription.service';
import { Subscription } from 'rxjs';
import { PatientService } from '../patient/patient.service';
import { DrugService } from '../drug/drug.service';
import { IPatient } from '../interfaces/patient';
import { IDrug } from '../interfaces/drug';
import { NgForm } from '@angular/forms';
import { DialogService } from '../shared/service/dialog.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  viewMode = 'list';

  prescriptions: IPrescription[] = [];
  drugs: IDrug[] = [];
  patients: IPatient[] = [];
  prescription: IPrescription;
  patient: IPatient;
  drug: IDrug;

  totalPrescriptions: number = 0;

  prescriptionSub: Subscription;
  patientSub: Subscription;
  drugSub: Subscription;


  constructor(
    public dialogService: DialogService,
    public prescriptionService: PrescriptionService,
    public patientService: PatientService,
    public drugService: DrugService
  ) { }

  onDeleteDialog(prescriptionId: string) {
    this.dialogService.prescriptionDeleteDialog(prescriptionId);
  }

  onSubmitPrescription(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.prescriptionService.addPrescription
      (
        form.value.inputFormula,
        form.value.inputDuration,
        form.value.inputDrugName,
        form.value.inputPatientName
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  }

  onSubmitPrescriptionEdit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.prescriptionService.updatePrescription
      (
        this.prescription._id,
        form.value.inputFormula,
        form.value.inputDuration,
        form.value.inputDrugName,
        form.value.inputPatientName
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  };

  onEditPrescriptionMode(prescriptionId: string) {
    this.patientService.getPatients2()
    .subscribe(patientsData => {
      this.patients = patientsData.patients;
    });;
  this.drugService.getDrugs2()
    .subscribe(drugData => {
      this.drugs = drugData.drugs;
    });;
    this.prescriptionService.getPrescriptionDetails(prescriptionId)
      .subscribe(prescriptionData => {
        console.log(prescriptionData.patient)
        console.log(prescriptionData.drug)
        this.prescription = prescriptionData.prescription;
        this.patient = prescriptionData.patient;
        this.drug = prescriptionData.drug;
      });;
    setTimeout(() => {
      this.viewMode = 'edit';
    }, 700);
  }


  onAdd() {
    this.patientService.getPatients2()
      .subscribe(patientsData => {
        this.patients = patientsData.patients;
      });;
    this.drugService.getDrugs2()
      .subscribe(drugData => {
        this.drugs = drugData.drugs;
      });;
    this.viewMode = 'new';
  }

  initContents() {
    this.prescriptionService.getPrescriptions();
    this.prescriptionSub = this.prescriptionService.getPrescriptionsUpdateListener()
      .subscribe((prescriptionData: { prescriptions: IPrescription[]; totalPrescriptions: number; }) => {
        this.prescriptions = prescriptionData.prescriptions;
        this.totalPrescriptions = prescriptionData.totalPrescriptions;
      });


  }

  ngOnInit() {
    this.initContents();
  }

  ngOnDestroy(): void {
    // this.prescriptionSub.unsubscribe();

  }

}
