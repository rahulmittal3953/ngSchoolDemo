import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import { NgForm } from '@angular/forms';
import { NotificationsService } from "angular2-notifications";

import { ClassFee } from "../../models/classfee";
import { ClassFeeService } from "../../services/classfee.service";

@Component({
  templateUrl: "./classfee.component.html"
})
export class ClassFeeComponent implements OnInit{

  searchClass :String;
  classFees : ClassFee[] =[];


  itemResource = new DataTableResource(this.classFees);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};

  constructor(
    private classFeeService: ClassFeeService,
    private router: Router,
    private ngProgress: NgProgress,
    private notif : NotificationsService) { 
}


  ngOnInit() {
    this.getClassData();
  }

  getClassData(){
    console.log("call Class service");
    this.ngProgress.start();
    this.classFeeService
      .getclassFees()
      .subscribe(result => {
        this.classFees = result;
        console.log( "Fee for Class ----> " + JSON.stringify(this.classFees));
        //this.items = this.students;
        this.itemResource = new DataTableResource(this.classFees);
        this.reloadItems(this.params);
        this.itemResource.count().then(count => this.itemCount = count);
        this.ngProgress.done();
        if(this.classFees.length == 0){
          this.notif.info("Information", "There are no Class Fee in the System.");
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Class Fee details, please try again.");
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

editClass(classFee: ClassFee){
  console.log('Clicked: ' + classFee.name);
  this.classFeeService.classFee = classFee;
  this.router.navigate(["/app/updateclassfee/"+classFee.classFeeId]);
}

viewClass(classFee: ClassFee){
  console.log('Clicked: ' + classFee.name);
  this.classFeeService.classFee = classFee;
  this.router.navigate(["/app/classfeedetail/"+classFee.classFeeId]);
}

doInactiveClass(classFee: ClassFee){
  console.log('Clicked: ' + classFee.name);
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
    this.items = this.classFees;
    this.reloadItems(this.params);
  }
 // this.items.filter(val => this.items = val);
 this.items = this.classFees.filter(student => student.name.toLowerCase() === val.toLowerCase())
 //console.log(JSON.parse(this.students));
}

}
