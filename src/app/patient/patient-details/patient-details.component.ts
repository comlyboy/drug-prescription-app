import { Component, OnInit } from '@angular/core';
import { IPatient } from 'src/app/interfaces/patient';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { IPrescription } from 'src/app/interfaces/prescription';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patient: IPatient;
  prescriptions: IPrescription[] = [];

  patientId: string;
  totalPrescriptions: number = 0;

  constructor(
    public patientService: PatientService,
    public route: ActivatedRoute,
    private router: Router,
  ) { }

  initContents() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientId = paramMap.get('patientId');
      this.patientService.getPatientDetails(this.patientId)
        .subscribe((patientData: { patient: IPatient, prescriptions: IPrescription[] }) => {
          console.log(patientData)
          this.patient = patientData.patient
          this.prescriptions = patientData.prescriptions;
          this.totalPrescriptions = this.prescriptions.length;
        });
    });

  }

  ngOnInit() {
    this.initContents();

  }

}
