import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { IPatient } from '../../interfaces/patient';
import { IPrescription } from '../../interfaces/prescription';
import { IDrug } from '../../interfaces/drug';
import { PatientService } from '../../patient/patient.service';
import { PrescriptionService } from '../prescription.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.scss']
})
export class PrescriptionDetailsComponent implements OnInit {
  prescriptionId: string;

  patient: IPatient;
  drug: IDrug;
  doctor: IUser;
  prescription: IPrescription;

  constructor(
    public prescriptionService: PrescriptionService,
    public route: ActivatedRoute,
    private router: Router,
  ) { }

  initContents() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.prescriptionId = paramMap.get('prescriptionId');
      this.prescriptionService.getPrescriptionDetails(this.prescriptionId)
        .subscribe((prescriptionData: {
          prescription: IPrescription,
          patient: IPatient,
          drug: IDrug,
          doctor: IUser
        }) => {
          this.drug = prescriptionData.drug;
          this.patient = prescriptionData.patient;
          this.prescription = prescriptionData.prescription;
          this.doctor = prescriptionData.doctor;
        });
    });

  }

  ngOnInit() {
    this.initContents();

  }
}
