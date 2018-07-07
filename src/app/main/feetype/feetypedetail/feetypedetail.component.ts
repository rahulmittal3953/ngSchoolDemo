import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";


import { FeeTypeService } from "../../../services/feetype.service";
import { ClassFeeType } from "../../../models/classfeetype";

import { Frequencies } from "../../../models/frequencymeta";

@Component({
  templateUrl: "./feetypedetail.component.html"
})
export class FeeTypeDetailComponent {

  classFeeType : ClassFeeType = new ClassFeeType();
  index:any;
  frequencies = Frequencies;

  constructor(
    private feeTypeService: FeeTypeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        this.index = params['id'];
      });
}
ngOnInit() {
  this.ngProgress.start();
  console.log(this.feeTypeService.feeType);
  if(!this.feeTypeService.feeType){
   window.scroll(0,0);
   
   this.feeTypeService
     .getFeeType(this.index)
     .subscribe(result => {
       if(result){
         this.classFeeType = result;
       } else{
         this.notif.info("Information", "No such record not found in the system, please try again.");
       }
       this.ngProgress.done();
     },
     error =>{
       console.log(error);
       this.ngProgress.done();
       this.notif.error("Failure", "While fetching Student detail, please try again.");
     });
  }else {
   this.classFeeType=this.feeTypeService.feeType
   this.ngProgress.done();
  }

}

editFeeType(classFeeType: ClassFeeType){
  console.log('Clicked: ' + ClassFeeType.name);
  this.feeTypeService.feeType = classFeeType;
  this.router.navigate(["/app/updatefeetype/"+classFeeType.classFeeTypeId]);
}

ClearAll(form: NgForm){
  console.log("res"); 
  form.resetForm();
}

}
