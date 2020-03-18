import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalPatients: number = 0;
  totalDrugs: number = 0;
  totalPrescriptions: number = 0;


  constructor(
    private dashboardService: DashboardService
  ) { }

  initContents() {
    this.dashboardService.getSummary()
      .subscribe((data: {
        totalDrugs: number,
        totalPatients: number,
        totalPrescriptions: number
      }) => {
        this.totalDrugs = data.totalDrugs;
        this.totalPatients = data.totalPatients;
        this.totalPrescriptions = data.totalPrescriptions;
      });


  }

  ngOnInit() {
    this.initContents();
  }


}
