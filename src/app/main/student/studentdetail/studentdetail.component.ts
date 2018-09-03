import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';

import { NotificationsService } from "angular2-notifications";
import {NgForm} from '@angular/forms';
import { DataTableResource } from 'angular5-data-table';

import { StudentService } from "../../../services/student.service";
import { Student } from "../../../models/student";

import { ClassService } from "../../../services/class.service";
import { StudentClass } from "../../../models/studentclass";
import { StudentFee } from "../../../models/studentfee";
import { StudentFeeParams } from "../../../models/studentfeeparams";
import { FeeTypeService } from "../../../services/feetype.service";
import {StudentPaymentHistory } from "../../../models/studentpaymenthistory";
import { PayStudentFee } from "../../../models/paystudentfee";
import { StudentFine } from "../../../models/studentfine";
import { StudentWaiver } from "../../../models/studentwaiver";
import {StudentFeeWaiverHistory } from "../../../models/studentfeewaiverhistory";

@Component({
  templateUrl: "./studentdetail.component.html"
})
export class StudentDetailComponent implements OnInit{
  
  student: Student = new Student();
  payStudentFee : PayStudentFee = new PayStudentFee();
  studentFine : StudentFine = new StudentFine();
  studentWaiver : StudentWaiver = new StudentWaiver();
  studentFee : StudentFee = new StudentFee();
  
  
  index: any;
  admissionClasses : StudentClass[] =[];
  studentFeeParams: StudentFeeParams[] = [];
  studentPaymentHistory: StudentPaymentHistory[] = [];
  studentFeeWaiverHistory: StudentFeeWaiverHistory[] = [];

  studentFeeItemResource = new DataTableResource(this.studentFeeParams);
  studentFeeItems = [];
  studentFeeItemCount = 0;

  studentPaymentHistoryItemResource = new DataTableResource(this.studentPaymentHistory);
  studentPaymentHistoryItems = [];
  studentPaymentHistoryItemCount = 0;

  studentFeeWaiverHistoryItemResource = new DataTableResource(this.studentFeeWaiverHistory);
  studentFeeWaiverHistoryItems = [];
  studentFeeWaiverHistoryItemCount = 0;

  params = {offset: 0, limit: 10};

  payFeeAmount:String;
  payFeeComments:String;

  fineAmount:String;
  fineComments:String;
  
  waiverName:String;
  waiverAmount:String;
  waiverComments:String;
 

  constructor(
      private studentService: StudentService, 
      private notif : NotificationsService,
      private router: Router,
      private ngProgress: NgProgress,
      private route: ActivatedRoute,
      private classService: ClassService,
      private feeTypeService: FeeTypeService
    ) { 
      this.route.params.subscribe(params => {
        this.index = params['id'];
      });
    }
  
  ngOnInit() {
    this.getClassData();
    this.ngProgress.start();
    console.log(this.studentService.studentData);
    if(!this.studentService.studentData){
    window.scroll(0,0);
    
    this.studentService
      .getStudent(this.index)
      .subscribe(result => {
        if(result){
          this.student = result;
          this.getStudentFee();
        } else{
          this.notif.info("Information", "No such record not found in the system, please try again.");
        }
        this.ngProgress.done();
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Student detail, please try again.");
      });
   }else {
    this.student=this.studentService.studentData
    //this.notif.info("Good News", "Student detail is loaded successfuly.");
    this.ngProgress.done();
    this.getStudentFee();
   }
  }
  
  editStudent(student: Student){
    console.log('Clicked: ' + student.firstName);
    this.studentService.studentData = student;
    this.router.navigate(["/app/updatestudent/"+student.studentId]);
  }
  
  doInactiveStudent(student: Student){
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

  getStudentFee(){
    console.log("call Student service for student Fee");
    this.ngProgress.start();
    this.studentService
      .getStudentFee(this.index)
      .subscribe(result => {
        this.studentFee = (result.studentFeeId) ?  result : null;

        if(!this.studentFee){
          this.notif.info("Information", "There are no Student Fee details in the System.");
        }else{
          this.studentFeeParams = result.studentFeeParams;
          this.studentPaymentHistory = result.studentPaymentHistories;
          
          this.resetStudentFeeAndPaymentGrid();
          this.ngProgress.done();
          this.getWaiverDetails(result.studentFeeId);
        }
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Student Fee details, please try again.");
      });
  }


  getWaiverDetails(studentFeeId:any){
    console.log("call getWaiverDetails for student Fee");
    this.ngProgress.start();
    this.studentService
      .getWaiversFroStudentFee(studentFeeId)
      .subscribe(result => {
        this.studentFeeWaiverHistory = result.studentFeeWaiverHistory;

        this.studentFeeWaiverHistoryItemResource = new DataTableResource(this.studentFeeWaiverHistory);
        this.reloadStudentFeeWaiverHistoryItems(this.params);
        this.studentFeeWaiverHistoryItemResource.count().then(count => this.studentFeeWaiverHistoryItemCount = count);

        this.ngProgress.done();
      },
      error =>{
        console.log(error);
        this.ngProgress.done();
        this.notif.error("Failure", "While fetching Waiver details, please try again.");
      });
  }


  reloadStudentFeeItems(params) {
    console.log("reload  --> reloadStudentFeeItems");
    this.studentFeeItemResource.query(params).then(items => this.studentFeeItems = items);
  }

  reloadStudentPaymentHistoryItems(params) {
    console.log("reload --> reloadStudentPaymentHistoryItems");
    this.studentPaymentHistoryItemResource.query(params).then(items => this.studentPaymentHistoryItems = items);
  }

  reloadStudentFeeWaiverHistoryItems(params) {
    console.log("reload --> reloadStudentFeeWaiverHistoryItems");
    this.studentFeeWaiverHistoryItemResource.query(params).then(items => this.studentFeeWaiverHistoryItems = items);
  }

// special properties:

  rowClick(rowEvent) {
      console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { 
    return item.name; 
  }

  payFee(studentFee: StudentFee) {
    console.log("pay Fee" + studentFee);
    // let payStudentFee = {
    //   studentFee : studentFee,
    //   payFeeAmount : this.payFeeAmount,
    //   payFeeComments: this.payFeeComments
    // }
    //console.log(payStudentFee);
    this.payStudentFee.paymentAmount = this.payFeeAmount;
    this.payStudentFee.paymentComments = this.payFeeComments;
    this.payStudentFee.studentFee = this.studentFee;

    console.log(this.payStudentFee);

    this.ngProgress.start();
    window.scroll(0, 0);
    this.studentService
      .addStudentPayment(this.payStudentFee)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.studentFee = result;
        this.studentFeeParams= result.studentFeeParams;
        this.studentPaymentHistory = result.studentPaymentHistories;

        this.resetStudentFeeAndPaymentGrid();

        this.ngProgress.done();
        this.notif.success("Success", "Amount has been paid successfully.");
      },
        error => {
          console.log(error);
          this.ngProgress.done();
          this.notif.error("Failure", "While doing payment, please try again.");
        }
      );

  }

  addWaiver(studentFee : StudentFee) {
    
    this.studentWaiver.waiverName = this.waiverName;
    this.studentWaiver.waiverAmount = this.waiverAmount;
    this.studentWaiver.waiverComments = this.waiverComments;
    this.studentWaiver.studentFee = this.studentFee;

    console.log(this.studentWaiver);

    this.ngProgress.start();
    window.scroll(0, 0);
    this.studentService
      .addStudentWaiver(this.studentWaiver)
      .subscribe(result => {
        console.log(result);
        this.studentFee = result;
        this.resetStudentFeeAndPaymentGrid();

        this.ngProgress.done();
        this.notif.success("Success", "Waiver has been added successfully.");
        this.getWaiverDetails(this.studentFee.studentFeeId);
      },
        error => {
          console.log(error);
          this.ngProgress.done();
          this.notif.error("Failure", "While adding waiver, please try again.");
        }
      );

  }
  
  addFine(studentFee: StudentFee) 
  {
    //alert(this.fineAmount + "==" + this.fineComments);

    this.studentFine.fineAmount = this.fineAmount;
    this.studentFine.fineComments = this.fineComments;
    this.studentFine.studentFee = this.studentFee;

    console.log(this.studentFine);

    this.ngProgress.start();
    window.scroll(0, 0);
    this.studentService
      .addStudentFine(this.studentFine)
      .subscribe(result => {
        //this.students = result;
        console.log(result);
        this.studentFee = result;
        this.studentFeeParams= result.studentFeeParams;

        this.resetStudentFeeAndPaymentGrid();

        this.ngProgress.done();
        this.notif.success("Success", "Fine has been added successfully.");
      },
        error => {
          console.log(error);
          this.ngProgress.done();
          this.notif.error("Failure", "While doing Fine, please try again.");
        }
      );
  }

  resetStudentFeeAndPaymentGrid()
  {

    this.studentFeeItemResource = new DataTableResource(this.studentFeeParams);
    this.reloadStudentFeeItems(this.params);
    this.studentFeeItemResource.count().then(count => this.studentFeeItemCount = count);

    this.studentPaymentHistoryItemResource = new DataTableResource(this.studentPaymentHistory);
    this.reloadStudentPaymentHistoryItems(this.params);
    this.studentPaymentHistoryItemResource.count().then(count => this.studentPaymentHistoryItemCount = count);
  }

}