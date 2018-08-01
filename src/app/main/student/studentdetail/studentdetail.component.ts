import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';

import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';
import { DataTableResource } from 'angular5-data-table';

import { StudentService } from "../../../services/student.service";
import { Student } from "../../../models/student";

import { ClassService } from "../../../services/class.service";
import { StudentClass } from "../../../models/studentclass";
import { StudentFee } from "../../../models/studentfee";
import { StudentFeeParams } from "../../../models/studentfeeparams";
import { FeeTypeService } from "../../../services/feetype.service";


@Component({
  templateUrl: "./studentdetail.component.html"
})
export class StudentDetailComponent implements OnInit{
  
  student : Student = new Student();
  index:any;
  admissionClasses : StudentClass[] =[];
  studentFee : StudentFee = new StudentFee();

  studentFeeParams: StudentFeeParams[] = [];
  itemResource = new DataTableResource(this.studentFeeParams);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};
  
  constructor(
      private studentService: StudentService, 
      private notif : NotificationsService,
      private router: Router,
      private ngProgress: NgProgress,
      private route: ActivatedRoute,
      private classService: ClassService,
      private feeTypeService: FeeTypeService
    ) { 
      this.route.params.subscribe(params => {
        this.index = params['id'];
      });
    }
  
  ngOnInit() {
    this.getClassData();
    this.ngProgress.start();
    console.log(this.studentService.studentData);
    if(!this.studentService.studentData){
    window.scroll(0,0);
    
    this.studentService
      .getStudent(this.index)
      .subscribe(result => {
        if(result){
          this.student = result;
          this.getStudentFee();
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
    this.student=this.studentService.studentData
    //this.notif.info("Good News", "Student detail is loaded successfuly.");
    this.ngProgress.done();
    this.getStudentFee();
   }
  }
  
  editStudent(student: Student){
    console.log('Clicked: ' + student.firstName);
    this.studentService.studentData = student;
    this.router.navigate(["/app/updatestudent/"+student.studentId]);
  }
  
  doInactiveStudent(student: Student){
    console.log('Clicked: ' + student.firstName);
  }

  getClassData(){
    console.log("call Class service");
    this.ngProgress.start();
    this.classService
      .getClasses()
      .subscribe(result => {
        this.admissionClasses = result;
        this.ngProgress.done();
        if(this.admissionClasses.length == 0){
          this.notif.info("Information", "There are no class details in the System.");
        }
        
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Class details, please try again.");
      });
  }
  
  fnCompareStudentClass(a:StudentClass,b :StudentClass){
    //console.log(a && b && a.studentClassId == b.studentClassId);
    return a && b && a.studentClassId == b.studentClassId; 

  }

  getStudentFee(){
    console.log("call Student service for student Fee");
    this.ngProgress.start();
    this.studentService
      .getStudentFee(this.index)
      .subscribe(result => {
        this.studentFee = (result.studentFeeId) ?  result : null;

        if(!this.studentFee){
          this.notif.info("Information", "There are no Student Fee details in the System.");
        }else{
          this.studentFeeParams = result.studentFeeParams;
          this.ngProgress.done();
          this.itemResource = new DataTableResource(this.studentFeeParams);
          this.reloadItems(this.params);
          this.itemResource.count().then(count => this.itemCount = count);
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Student Fee details, please try again.");
      });
  }

  reloadItems(params) {
    console.log("reload");
    this.itemResource.query(params).then(items => this.items = items);
}

// special properties:

rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
}

rowTooltip(item) { 
  return item.name; 
}
}
  