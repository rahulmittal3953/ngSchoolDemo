import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";


import { FeeTypeService } from "../../../services/feetype.service";
import { ClassFeeType } from "../../../models/classfeetype";

import { Frequencies } from "../../../models/frequencymeta";

@Component({
  templateUrl: "./addfeetype.component.html"
})
export class AddFeeTypeComponent {

  classFeeType : ClassFeeType = new ClassFeeType();
  frequencies = Frequencies;

  constructor(
    private feeTypeService: FeeTypeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService) { 
}
ngOnInit() {}


addClass() {
  console.log("in add AddFeeTypeComponent method" + JSON.stringify(this.classFeeType));
  this.ngProgress.start();
  window.scroll(0,0);
  this.feeTypeService
    .addFeeType(this.classFeeType)
    .subscribe(result => {
      //this.students = result;
      console.log(result);
      this.ngProgress.done();
      this.notif.success("Success", "Fee Type details has been saved successfully.");
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While saving the Fee Type details, please try again.");
    }
  );


}

ClearAll(form: NgForm){
  console.log("res"); 
  form.resetForm();
}
}
