import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";
import * as enLocale from 'date-fns/locale/en';


import { ClassFeeService } from "../../../services/classfee.service";
import { ClassFee } from "../../../models/classfee";

import {FeeTypeService } from "../../../services/feetype.service";
import { ClassFeeType } from "../../../models/classfeetype";

@Component({
  templateUrl: "./addclassfee.component.html"
})
export class AddClassFeeComponent {

  public classFeeForm: FormGroup; // our form model
  classFee : ClassFee = new ClassFee();
  classFeeTypes : ClassFeeType[] =[];

  constructor(
    private classFeeService: ClassFeeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService,
    private _fb: FormBuilder,
    private feeTypeService: FeeTypeService) { 
}
ngOnInit() {
  this.getFeeTypeData();
  this.classFeeForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['',[Validators.required]],
    startDate:['',[Validators.required]],
    endDate:['',[Validators.required]],
    classFeeParams: this._fb.array([
        this.initAddFeeParams(),
    ])
});
}

getFeeTypeData(){
  console.log("call Class service");
  this.ngProgress.start();
  this.feeTypeService
    .getFeeTypes()
    .subscribe(result => {
      this.classFeeTypes = result;
      this.ngProgress.done();
      if(this.classFeeTypes.length == 0){
        this.notif.info("Information", "There are no Fee Type in the System.");
      }
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While fetching Fee Type details, please try again.");
    });
}

initAddFeeParams() {
  // initialize our address
  return this._fb.group({
      // classFeeParamsId : [1],
      classFeeType : ['', Validators.required],
      feeAmount : ['', Validators.required]
  });
}

addFeeParams() {
  // add address to the list
  const control = <FormArray>this.classFeeForm.controls['classFeeParams'];
  control.push(this.initAddFeeParams());
}

removeFeeParams(i: number) {
  // remove address from the list
  const control = <FormArray>this.classFeeForm.controls['classFeeParams'];
  control.removeAt(i);
}

addClassFee(model: FormGroup) {
  if (this.classFeeForm.valid) {
    console.log("in add addClassFee method" + JSON.stringify(this.classFee));
    console.log(model);
    //this.classFee = model;
    this.classFee.name = model.controls.name.value;
    this.classFee.startDate = model.controls.startDate.value;
    this.classFee.endDate = model.controls.endDate.value;
    this.classFee.description = model.controls.description.value;
    this.classFee.classFeeParams = model.controls.classFeeParams.value;

    this.ngProgress.start();
    window.scroll(0,0);
    this.classFeeService
      .addClassFee(this.classFee)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.ngProgress.done();
        this.notif.success("Success", "Class Fee details has been saved successfully.");
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While saving the Class Fee details, please try again.");
      }
    );
  }

}

ClearAll(){
  if (this.classFeeForm.valid) {
    this.classFeeForm.reset();
  }
}

displayFrequency(model){
  if(model.value)
    return this.feeTypeService.displayFrequency(model.value.frequency)
  else return '';
  
}

}
