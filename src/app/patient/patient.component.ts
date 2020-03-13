import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  viewMode = 'list';
  totalPatients: number = 0;


  constructor() { }

  

  onSubmitPatient(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // this.branchService.addBranch
    //   (
    //     form.value.inputName,
    //     form.value.inputDescription
    //   );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  }


  onSearchInput(e) {

  }

  ngOnInit(): void {
  }

}
