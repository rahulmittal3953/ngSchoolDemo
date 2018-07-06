import { Component, OnInit } from "@angular/core";
import { DataTableResource } from 'angular5-data-table';
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';
import { NgForm } from '@angular/forms';
import { NotificationsService } from "angular2-notifications";

import { FeeTypeService } from "../../services/feetype.service";
import { ClassFeeType } from "../../models/classfeetype";

@Component({
  templateUrl: "./feetype.component.html"
})
export class FeeTypeComponent implements OnInit{

  searchClass :String;
  classFeeTypes : ClassFeeType[] =[];


  itemResource = new DataTableResource(this.classFeeTypes);
  items = [];
  itemCount = 0;
  params = {offset: 0, limit: 10};

  constructor(
    private feeTypeService: FeeTypeService,
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
    this.feeTypeService
      .getFeeTypes()
      .subscribe(result => {
        this.classFeeTypes = result;
        //this.items = this.students;
        this.itemResource = new DataTableResource(this.classFeeTypes);
        this.reloadItems(this.params);
        this.itemResource.count().then(count => this.itemCount = count);
        this.ngProgress.done();
        if(this.classFeeTypes.length == 0){
          this.notif.info("Information", "There are no Fee Type in the System.");
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Fee Type details, please try again.");
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

editClass(classFeeType: ClassFeeType){
  console.log('Clicked: ' + classFeeType.name);
  this.feeTypeService.feeType = classFeeType;
  this.router.navigate(["/app/updatefeetype/"+classFeeType.classFeeTypeId]);
}

viewClass(classFeeType: ClassFeeType){
  console.log('Clicked: ' + ClassFeeType.name);
  this.feeTypeService.feeType = classFeeType;
  this.router.navigate(["/app/feetypedetail/"+classFeeType.classFeeTypeId]);
}

doInactiveClass(classFeeType: ClassFeeType){
  console.log('Clicked: ' + classFeeType.name);
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
    this.items = this.classFeeTypes;
    this.reloadItems(this.params);
  }
 // this.items.filter(val => this.items = val);
 this.items = this.classFeeTypes.filter(student => student.name.toLowerCase() === val.toLowerCase())
 //console.log(JSON.parse(this.students));
}

}
