import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';

import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';
import { DataTableResource } from "angular5-data-table";

import { Student } from "../../../models/student";

import { StudentClass } from "../../../models/studentclass";
import { ClassService } from "../../../services/class.service";

import { StudentService } from "../../../services/student.service";


@Component({
  templateUrl: "./classdetail.component.html"
})
export class ClassDetailComponent implements OnInit{
  studentClass : StudentClass = new StudentClass();
  index:any;

  students : Student[] =[];
  
  itemResource = new DataTableResource(this.students);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};
  
  constructor(
      private classService: ClassService, 
      private notif : NotificationsService,
      private studentService: StudentService,
      private router: Router,
      private ngProgress: NgProgress,
      private route: ActivatedRoute
    ) { 
      this.route.params.subscribe(params => {
        this.index = params['id'];
      });
    }
  
  ngOnInit() {
    this.ngProgress.start();
    console.log(this.classService.classData);
    if(!this.classService.classData){
     window.scroll(0,0);
     
     this.classService
       .getClass(this.index)
       .subscribe(result => {
         if(result){
           this.studentClass = result;
           this.showStudentDataGrid(result.students);
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
     this.studentClass=this.classService.classData
     this.showStudentDataGrid(this.studentClass.students);
     this.ngProgress.done();
    }

  }

  editClass(studentClass: StudentClass){
    console.log('Clicked: ' + studentClass.name);
    this.classService.classData = studentClass;
    this.router.navigate(["/app/updateclass/"+studentClass.studentClassId]);
  }
  
  doInactiveClass(studentClass: StudentClass){
    console.log('Clicked: ' + studentClass.name);
  }

  reloadItems(params) {
    console.log("reload");
    this.itemResource.query(params).then(items => this.items = items);
}

// special properties:

rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
}

editStudent(student: Student){
  console.log('Clicked: ' + student.firstName);
  student.studentClass = this.studentClass;
  this.studentService.studentData = student;
  this.router.navigate(["/app/updatestudent/"+student.studentId]);
}
viewStudent(student: Student){
  console.log('Clicked: ' + student.firstName);
  student.studentClass = this.studentClass;
  this.studentService.studentData = student;
  this.router.navigate(["/app/studentdetail/"+student.studentId]);
}

doInactiveStudent(student: Student){
  console.log('Clicked: ' + student.firstName);
}

rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
}

rowTooltip(item) { 
  return item.name; 
}

showStudentDataGrid(students : Student[]){
  this.students = students;
  this.itemResource = new DataTableResource(students);
  this.reloadItems(this.params);
  this.itemResource.count().then(count => this.itemCount = count);
}

}
