import { Component,OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';


import { Student } from '../../models/student';

@Component({
  templateUrl: "./addstudent.component.html"
})
export class AddStudentComponent implements OnInit{
  model: any = {};
  student : Student = new Student();
  //private notif: NotificationsService;

  constructor(private notif : NotificationsService) {}
  ngOnInit() {}

  addStudent() {
    console.log("in add student method" + JSON.stringify(this.student));
    console.log("go for submussion" + this.model);
    window.scroll(0,0);
    this.notif.success("Success", "Student record has been saved successfully!", {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 100
    });
  }

  ClearAll(form: NgForm){
    console.log("res"); 
    form.resetForm();
  }
}
