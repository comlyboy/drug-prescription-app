import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  totalPrescriptions: number = 0
  
  constructor() { }

  ngOnInit(): void {
  }

}
