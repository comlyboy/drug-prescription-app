import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IDrug } from '../interfaces/drug';
import { DrugService } from './drug.service';
import { DialogService } from '../shared/service/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss']
})
export class DrugComponent implements OnInit {
  viewMode = 'list'
  totalDrugs: number = 0;

  drug: IDrug;
  drugs: IDrug[] = [];
  drugSub: Subscription;

  constructor(
    public drugService: DrugService,
    public dialogService: DialogService
  ) { }


  onEditDrugMode(drugId: string) {
    this.drugService.getDrugDetails(drugId)
      .subscribe((drugData: IDrug) => {
        this.drug = drugData
      });
    this.viewMode = "edit"
  }


  onSubmitDrugEdit(form: NgForm) {
    this.drugService.updateDrugDetails
      (
        this.drug._id,
        form.value.inputDrugName,
        form.value.inputDescription
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  }

  onSubmitDrug(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.drugService.addDrug
      (
        form.value.inputDrugName,
        form.value.inputDescription,
      );

    setTimeout(() => {
      this.viewMode = "list"
    }, 700);

  };


  onDeleteDialog(drugId: string) {
    this.dialogService.drugDeleteDialog(drugId);

  }


  initContents() {
    this.drugService.getDrugs();
    this.drugSub = this.drugService.getDrugsUpdateListener()
      .subscribe((drugData: { drugs: IDrug[], totalDrugs: number }) => {
        this.drugs = drugData.drugs;
        this.totalDrugs = drugData.totalDrugs;
      })
  }

  ngOnInit() {
    this.initContents();
  }

}
