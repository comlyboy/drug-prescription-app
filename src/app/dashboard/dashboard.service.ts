import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = environment.API_URL;



  constructor(
    private http: HttpClient
  ) { }


  getSummary() {
    return this.http.get<{
      totalDrugs: number,
      totalPatients: number,
      totalPrescriptions: number
    }>(`${this.API_URL}metrics`);
  }


}
