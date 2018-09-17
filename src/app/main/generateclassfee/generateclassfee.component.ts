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
  templateUrl: "./generateclassfee.component.html"
})
export class GenerateClassFeeComponent {
  public result: any;
  private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();

  generateFee : GenerateFee = new GenerateFee();
  classFees : ClassFee[] =[];
  studentClassesData : StudentClass[] =[];
  
  public generateClassFeeForm: FormGroup; // our form model


  constructor(
    private classFeeService: ClassFeeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService,
    private _fb: FormBuilder,
    private feeTypeService: FeeTypeService,
    private classService: ClassService) { 
}
ngOnInit() {

  this.getClassFeeData();
  this.getClassData();
  this.generateClassFeeForm = this._fb.group({
    classFee: ['', [Validators.required]],
    studentClasses: this._fb.array([
        this.initAddStudentClasses(),
    ])
});

}

initAddStudentClasses() {
  // initialize our address
  return this._fb.group({
    0 :['', Validators.required]
  });
}

addStudentClasses() {
  // add address to the list
  const control = <FormArray>this.generateClassFeeForm.controls['studentClasses'];
  control.push(this.initAddStudentClasses());
}

removeStudentClasses(i: number) {
  // remove address from the list
  const control = <FormArray>this.generateClassFeeForm.controls['studentClasses'];
  control.removeAt(i);
}


generateClassFee(model: FormGroup) {
  if (this.generateClassFeeForm.valid) {


    let tempStudentClasses: StudentClass[] = model.controls.studentClasses.value;
    let outStudentClasses: StudentClass[]=[];
    tempStudentClasses.forEach(element => {
      outStudentClasses.push(element[0]);
    });


    this.generateFee.classFee = model.controls.classFee.value
    this.generateFee.studentClasses = outStudentClasses;
    console.log(this.generateFee);

    this.ngProgress.start();
    window.scroll(0,0);

    this.classFeeService
      .generateStudentFee(this.generateFee)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.ngProgress.done();
        this.notif.success("Success", "Generate Fee has been submitted successfully.");
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While proceesing the Generate Fee, please try again.");
      }
    );

  }

}



ClearAll(){
  if (this.generateClassFeeForm.valid) {
    this.generateClassFeeForm.reset();
  }
}

getClassFeeData(){
  console.log("call Class service");
  this.ngProgress.start();
  this.classFeeService
    .getclassFees()
    .subscribe(result => {
      this.classFees = result;
      //console.log( "Fee for Class ----> " + JSON.stringify(this.classFees));
      this.ngProgress.done();
      if(this.classFees.length == 0){
        this.notif.info("Information", "There are no Class Fee in the System.");
      }
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While fetching Class Fee details, please try again.");
    });
}

  getClassData(){
    console.log("call Class service");
    this.ngProgress.start();
    this.classService
      .getClasses()
      .subscribe(result => {
        this.studentClassesData = result;
        //console.log( "Student Class Data ----> " + JSON.stringify(this.studentClassesData));
        this.ngProgress.done();
        if(this.studentClassesData.length == 0){
          this.notif.info("Information", "There are no Student Class details in the System.");
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Student Class details, please try again.");
      });
  }

  handleFile(event){
      let file = event.target.files[0];
      this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
        this.result = data['sheets'].Sheet1;

        this.generateFee.studentPromotedClasses = this.result;
        //console.log(this.generateFee);
      this.classFeeService
      .studentPromotedClass(this.generateFee)
      .subscribe(result => {
        console.log(result);
      },
      error =>{
        console.log(error);
      });
    })
  }

  downloadFile(){
    console.log("Download excel");

      var options = {
        headers: ["studentId", "student", "currentClass","promotedToClass","passed"]
      };

      this.classFeeService
      .studentPromotedClassDownload()
      .subscribe(result => {
        console.log(result);
        new Angular5Csv(result.studentPromotedClasses, 'Sheet1',options);
      },
      error =>{
        console.log(error);
      });



     

     console.log("Download excel ended");
  }
}



@Component({
  templateUrl: "./generatenewstudentfee.component.html"
})
export class GenerateNewStudentFeeComponent {
  
  generateFee : GenerateFee = new GenerateFee();
  classFees : ClassFee[] =[];
  studentClassesData : StudentClass[] =[];
  
  public generateClassFeeForm: FormGroup; // our form model


  constructor(
    private classFeeService: ClassFeeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService,
    private _fb: FormBuilder,
    private feeTypeService: FeeTypeService,
    private classService: ClassService) { 
}
ngOnInit() {

  this.getClassFeeData();
  this.getClassData();
  this.generateClassFeeForm = this._fb.group({
    classFee: ['', [Validators.required]],
    studentClasses: this._fb.array([
        this.initAddStudentClasses(),
    ])
});

}

initAddStudentClasses() {
  // initialize our address
  return this._fb.group({
    0 :['', Validators.required]
  });
}

addStudentClasses() {
  // add address to the list
  const control = <FormArray>this.generateClassFeeForm.controls['studentClasses'];
  control.push(this.initAddStudentClasses());
}

removeStudentClasses(i: number) {
  // remove address from the list
  const control = <FormArray>this.generateClassFeeForm.controls['studentClasses'];
  control.removeAt(i);
}


generateFeeFornewStudent(model: FormGroup) {
  if (this.generateClassFeeForm.valid) {


    let tempStudentClasses: StudentClass[] = model.controls.studentClasses.value;
    let outStudentClasses: StudentClass[]=[];
    tempStudentClasses.forEach(element => {
      outStudentClasses.push(element[0]);
    });


    this.generateFee.classFee = model.controls.classFee.value
    this.generateFee.studentClasses = outStudentClasses;
    console.log(this.generateFee);

    this.ngProgress.start();
    window.scroll(0,0);

    this.classFeeService
      .generateFeeFornewStudent(this.generateFee)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.ngProgress.done();
        this.notif.success("Success", "Generate Fee for New Student has been submitted successfully.");
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While proceesing the Generate Fee for New Student, please try again.");
      }
    );

  }

}

ClearAll(){
  if (this.generateClassFeeForm.valid) {
    this.generateClassFeeForm.reset();
  }
}

getClassFeeData(){
  console.log("call Class service");
  this.ngProgress.start();
  this.classFeeService
    .getclassFees()
    .subscribe(result => {
      this.classFees = result;
      //console.log( "Fee for Class ----> " + JSON.stringify(this.classFees));
      this.ngProgress.done();
      if(this.classFees.length == 0){
        this.notif.info("Information", "There are no Class Fee in the System.");
      }
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While fetching Class Fee details, please try again.");
    });
}

getClassData(){
  console.log("call Class service");
  this.ngProgress.start();
  this.classService
    .getClasses()
    .subscribe(result => {
      this.studentClassesData = result;
      //console.log( "Student Class Data ----> " + JSON.stringify(this.studentClassesData));
      this.ngProgress.done();
      if(this.studentClassesData.length == 0){
        this.notif.info("Information", "There are no Student Class details in the System.");
      }
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While fetching Student Class details, please try again.");
    });
}

}
