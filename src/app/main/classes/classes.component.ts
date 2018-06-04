import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import {NgForm} from '@angular/forms';

import { ClassService } from "../../services/class.service";
import { Class } from "../../models/class";

@Component({
  templateUrl: "./classes.component.html"
})
export class ClassesComponent implements OnInit{

  searchClass :String;
  classes : Class[] =[];


  itemResource = new DataTableResource(this.classes);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};

  constructor(
    private classService: ClassService,
    private router: Router,
    private ngProgress: NgProgress) { 
}


  ngOnInit() {
    this.getClassData();
  }

  getClassData(){
    console.log("call Class service");
    this.ngProgress.start();
    this.classService
      .getClasses()
      .subscribe(result => {
        this.classes = result;
        console.log(this.classes);
        //this.items = this.students;
        this.itemResource = new DataTableResource(this.classes);
        this.reloadItems(this.params);
        this.itemResource.count().then(count => this.itemCount = count);
        //console.log("call studdent service" +this.students);
        this.ngProgress.done();
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

editStudent(classd: Class){
  console.log('Clicked: ' + classd.name);
  this.classService.classData = classd;
  this.router.navigate(["/app/updateclass/"+classd.id]);
}
viewStudent(classd: Class){
  console.log('Clicked: ' + classd.name);
  this.classService.classData = classd;
  this.router.navigate(["/app/classdetail/"+classd.id]);
}

doInactiveStudent(classd: Class){
  console.log('Clicked: ' + classd.name);
}

rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
}

rowTooltip(item) { 
  return item.name; 
}

filterData(val:string){
  this.searchClass = val;
  //console.log(val);
  if(val === '')
  {
    this.items = this.classes;
    this.reloadItems(this.params);
  }
 // this.items.filter(val => this.items = val);
 this.items = this.classes.filter(student => student.name.toLowerCase() === val.toLowerCase())
 //console.log(JSON.parse(this.students));
}

}
