import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";


import { StudentClass } from "../../../models/studentclass";
import { ClassService } from "../../../services/class.service";

@Component({
  templateUrl: "./addclass.component.html"
})
export class AddClassComponent {

  studentClass : StudentClass = new StudentClass();

  constructor(
    private classService: ClassService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService) { 
}
ngOnInit() {}


addClass() {
  console.log("in add student method" + JSON.stringify(this.studentClass));
  this.ngProgress.start();
  window.scroll(0,0);
  this.classService
    .addClass(this.studentClass)
    .subscribe(result => {
      //this.students = result;
      console.log(result);
      this.ngProgress.done();
      this.notif.success("Success", "Class details has been saved successfully.");
    },
    error =>{
      console.log(error);
      this.ngProgress.done();
      this.notif.error("Failure", "While saving the Class details, please try again.");
    }
  );


}

ClearAll(form: NgForm){
  console.log("res"); 
  form.resetForm();
}

}
