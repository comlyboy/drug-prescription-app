import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

import { PatientService } from 'src/app/patient/patient.service';
import { DrugService } from 'src/app/drug/drug.service';
import { PrescriptionService } from 'src/app/prescription/prescription.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private patientService: PatientService,
    private drugService: DrugService,
    private prescriptionService: PrescriptionService
  ) { }




  prescriptionDeleteDialog(prescriptionId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger bg-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // this.prescriptionService.deletePrescription(prescriptionId)
        //   .subscribe(() => {
        //     this.drugService.getDrugs();
        //     this.success()
        //   });
      }
    })
  };


  drugDeleteDialog(drugId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger bg-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.drugService.deleteDrug(drugId)
          .subscribe(() => {
            this.drugService.getDrugs();
            this.success()
          });
      }
    })
  };


  patientDeleteDialog(patientId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger bg-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.patientService.deletePatient(patientId)
          .subscribe(() => {
            this.patientService.getPatients();
            this.success()
          });
      }
    })
  };


  success() {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'success',
      title: "Success!!!"
    })

  }

}
