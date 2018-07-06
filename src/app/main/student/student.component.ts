import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';
import { NotificationsService } from "angular2-notifications";


import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";

@Component({
  templateUrl: "./student.component.html",
  styleUrls: ['./student.component.css']  
})
export class StudentComponent implements OnInit{
  
  searchStudent :String;
  students : Student[] =[];
  
  itemResource = new DataTableResource(this.students);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};

  constructor(
      private studentService: StudentService,
      private router: Router,
      private ngProgress: NgProgress,
      private notif : NotificationsService) { 
  }
  
  ngOnInit() {
   this.getStudentData();
  }

  getStudentData() {
    console.log("call studdent service");
    this.ngProgress.start();
    this.studentService
      .getStudents()
      .subscribe(result => {
        this.students = result;
        //this.items = this.students;
        this.itemResource = new DataTableResource(this.students);
        this.reloadItems(this.params);
        this.itemResource.count().then(count => this.itemCount = count);
        this.ngProgress.done();
        if(this.students.length == 0){
          this.notif.info("Information", "There are no Student details in the System.");
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Student details, please try again.");
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

  editStudent(student: Student){
    console.log('Clicked: ' + student.firstName);
    this.studentService.studentData = student;
    this.router.navigate(["/app/updatestudent/"+student.studentId]);
  }
  viewStudent(student: Student){
    console.log('Clicked: ' + student.firstName);
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

  filterData(val:string){
    this.searchStudent = val;
    //console.log(val);
    if(val === '')
    {
      this.items = this.students;
      this.reloadItems(this.params);
    }
   // this.items.filter(val => this.items = val);
   this.items = this.students.filter(student => student.firstName.toLowerCase() === val.toLowerCase())
   //console.log(JSON.parse(this.students));
  }
}
