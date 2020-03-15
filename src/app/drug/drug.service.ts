import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { NotificationService } from '../shared/service/notification.service';
import { IDrug } from '../interfaces/drug';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private API_URL = environment.API_URL;

  drugs: IDrug[] = [];


  constructor(
    private http: HttpClient,
    public notificationService: NotificationService
  ) { }

  addDrug(
    name: string,
    description: string,
  ) {

    const drugOBJ: IDrug = {
      _id: null,
      name,
      description
    };
    console.log(drugOBJ);
    this.http
      .post(
        `${this.API_URL}drug`, drugOBJ)
      .subscribe(() => {
        this.notificationService.success('Added successfully');
        this.getDrugs();
      });
  }


  private drugsUpdated = new Subject<{
    drugs: IDrug[],
    totalDrugs: number
  }>();

  getDrugsUpdateListener() {
    return this.drugsUpdated.asObservable();
  }

  getDrugs() {
    this.http
      .get<{
        drugs: IDrug[],
        totalDrugs: number
      }>(`${this.API_URL}drug`)
      .subscribe(drugData => {
        this.drugs = drugData.drugs;
        this.drugsUpdated.next({
          drugs: [...this.drugs],
          totalDrugs: drugData.totalDrugs
        });
      });
  }

  getDrugs2() {
    return this.http.get<{
      drugs: IDrug[]
    }>(`${this.API_URL}drug`)
  }


  getDrugDetails(drugId: string) {
    return this.http.get<IDrug>(`${this.API_URL}patient/${drugId}`);
  }

  updateDrugDetails(
    _id: string,
    name: string,
    description: string,

  ) {

    // const patientForEdit: IPatient = {
    //   firstName,
    //   lastName,
    //   age,
    //   gender,
    //   address
    // };
    // this.http
    //   .put(`${this.API_URL}patient/${_id}`, patientForEdit)
    //   .subscribe((result: any) => {
    //     this.notificationService.smallSuccess(result.message);
    //   });
  }

  deleteDrug(drugId: string) {
    return this.http.delete(`${this.API_URL}drug/${drugId}`);
  }
}
