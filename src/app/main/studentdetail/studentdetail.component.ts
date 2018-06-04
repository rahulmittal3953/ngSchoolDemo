import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';

import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';

import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";


@Component({
  templateUrl: "./studentdetail.component.html"
})
export class StudentDetailComponent implements OnInit{
  
  student : Student = new Student();
  
  constructor(
      private studentService: StudentService, 
      private notif : NotificationsService,
      private router: Router,
      private ngProgress: NgProgress
    ) { }
  
  ngOnInit() {
    this.ngProgress.start();
   console.log(this.studentService.studentData);
   if(!this.studentService.studentData){
    window.scroll(0,0);
    this.notif.error("Failure", "We are getting error while loading student detials, plelase try agian!");
    this.ngProgress.done();
   }else {
    this.student=this.studentService.studentData
    //this.notif.info("Good News", "Student detail is loaded successfuly.");
    this.ngProgress.done();
   }
  }
  
  editStudent(student: Student){
    console.log('Clicked: ' + student.name);
    this.studentService.studentData = student;
    this.router.navigate(["/app/updatestudent/"+student.id]);
  }
  
  doInactiveStudent(student: Student){
    console.log('Clicked: ' + student.name);
  }

}
