import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";
import { XlsxToJsonService } from '../../services/xlsx-to-json-service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { ClassFeeService } from "../../services/classfee.service";
import { ClassFee } from "../../models/classfee";

import { ClassService } from "../../services/class.service";
import { StudentClass } from "../../models/studentclass";

import {FeeTypeService } from "../../services/feetype.service";
import { ClassFeeType } from "../../models/classfeetype";
import { GenerateFee } from "../../models/generatefee";

@Component({
  templateUrl: "./promotestudent.component.html"
})
export class PromoteStudentComponent {
    public result: any;
    private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();
    generateFee : GenerateFee = new GenerateFee();

    constructor(
        private classFeeService: ClassFeeService,
        private router: Router,
        private ngProgress: NgProgress,
        private notif : NotificationsService,
        private _fb: FormBuilder,
        private feeTypeService: FeeTypeService,
        private classService: ClassService) { 
    }

    downloadFile(){
        console.log("Download excel");
        this.ngProgress.start();
        window.scroll(0,0);
          var options = {
            headers: ["studentId", "student", "currentClass","promotedToClass","passed"]
          };
    
          this.classFeeService
          .studentPromotedClassDownload()
          .subscribe(result => {
            console.log(result);
            this.ngProgress.done();
            new Angular5Csv(result.studentPromotedClasses, 'Sheet1',options);
            this.notif.success("Success", "Students Template has been downloaded successfully.");
          },
          error =>{
            this.ngProgress.done();
            this.notif.error("Failure", "While Downloading the Students Template, please try again.");
            console.log(error);
          });
    
    
    
         
    
         console.log("Download excel ended");
      }

      handleFile(event){
        this.ngProgress.start();
        window.scroll(0,0);
        let file = event.target.files[0];
        this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
          this.result = data['sheets'].Sheet1;
  
          this.generateFee.studentPromotedClasses = this.result;
          //console.log(this.generateFee);
        this.classFeeService
        .studentPromotedClass(this.generateFee)
        .subscribe(result => {
            this.ngProgress.done();
          console.log(result);
          this.notif.success("Success", "Students has been promoted successfully.");
        },
        error =>{
            this.ngProgress.done();
          console.log(error);
          this.notif.error("Failure", "While promoting the Students, please try again.");
        });
      })
    }
}