import { Component, OnInit } from "@angular/core";
import { NgProgress } from 'ngx-progressbar';

import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';

import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";


@Component({
  templateUrl: "./updatestudent.component.html"
})
export class UpdateStudentComponent implements OnInit{
  
  student : Student = new Student();
  
  constructor(
    private studentService: StudentService,
    private notif : NotificationsService,
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
  addStudent() {
    console.log("in add student method" + JSON.stringify(this.student));
    window.scroll(0,0);
    this.notif.success("Success", "Student record has been updated successfully!", {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 50
    });
  }

  ClearAll(form: NgForm){
    console.log("res"); 
    form.resetForm();
  }

  doInactiveStudent(student: Student){
    console.log('Clicked: ' + student.name);
  }
}
