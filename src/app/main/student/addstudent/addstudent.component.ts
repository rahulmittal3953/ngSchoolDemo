import { Component,OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';

import * as enLocale from 'date-fns/locale/en';

import { StudentService } from "../../../services/student.service";
import { Student } from '../../../models/student';

import { ClassService } from "../../../services/class.service";
import { StudentClass } from "../../../models/studentclass";

@Component({
  templateUrl: "./addstudent.component.html"
})
export class AddStudentComponent implements OnInit{
  model: any = {};
  student : Student = new Student();
  admissionClasses : StudentClass[] =[];

  constructor(
    private notif : NotificationsService,
    private studentService: StudentService,
    private ngProgress: NgProgress,
    private classService: ClassService
  ) {}
  ngOnInit() {
    this.getClassData();
  }

  addStudent() {
    console.log("in add student method" + JSON.stringify(this.student));
    console.log("go for submussion" + this.model);
    this.ngProgress.start();
    window.scroll(0,0);
    this.studentService
      .addStudent(this.student)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.ngProgress.done();
        this.notif.success("Success", "Student record has been saved successfully.");
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While saving the Student details, please try again.");
      }
    );


  }

  ClearAll(form: NgForm){
    console.log("res"); 
    form.resetForm();
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
}
