import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import { NotificationsService } from "angular2-notifications";
import { NgForm } from '@angular/forms';

import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";

import { ClassService } from "../../services/class.service";
import { StudentClass } from "../../models/studentclass";


@Component({
  templateUrl: "./updatestudent.component.html"
})
export class UpdateStudentComponent implements OnInit {

  student: Student = new Student();
  index: any;
  admissionClasses : StudentClass[] =[];

  constructor(
    private studentService: StudentService,
    private notif: NotificationsService,
    private router: Router,
    private ngProgress: NgProgress,
    private route: ActivatedRoute,
    private classService: ClassService
  ) {
    this.route.params.subscribe(params => {
      this.index = params['id'];
    });

  }

  ngOnInit() {
    this.getClassData();
    this.ngProgress.start();
    console.log("Upadte Screen" + this.studentService.studentData);
    if (!this.studentService.studentData) {
      window.scroll(0, 0);

      this.studentService
        .getStudent(this.index)
        .subscribe(result => {
          if(result){
            this.student = result;
          } else{
            this.notif.info("Information", "No such record not found in the system, please try again.");
          }
          this.ngProgress.done();
        },
          error => {
            console.log(error);
            this.ngProgress.done();
            this.notif.error("Failure", "While fetching Student detail, please try again.");
          });
  } else {
      this.student = this.studentService.studentData
      this.ngProgress.done();
    }
  }


  updateStudent() {
    console.log("in Update student method" + JSON.stringify(this.student));
    this.ngProgress.start();
    window.scroll(0, 0);
    this.studentService
      .updateStudent(this.student)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.ngProgress.done();
        this.notif.success("Success", "Student record has been updated successfully.");
      },
        error => {
          console.log(error);
          this.ngProgress.done();
          this.notif.error("Failure", "While updating the Student details, please try again.");
        }
      );
  }

  ClearAll(form: NgForm) {
    console.log("res");
    form.resetForm();
  }

  doInactiveStudent(student: Student) {
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
}
