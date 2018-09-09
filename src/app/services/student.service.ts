import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { Student } from "../models/student";
import { Status } from "../models/status";
import { StudentFee } from "../models/studentfee";
import { serviceBaseURL } from "../models/baseurls";
import { PayStudentFee } from "../models/paystudentfee";
import { StudentPaymentHistory } from "../models/studentpaymenthistory";
import { StudentFine } from "../models/studentfine";
import { StudentWaiver } from "../models/studentwaiver";
import { StudentFeeWaiverHistories } from "../models/studentfeewaiverhistories";

@Injectable()
export class StudentService {
  
  studentData : Student;
  apiURl : String = serviceBaseURL;
  
  constructor(
    private http: Http
  ) {}

  getStudents(): Observable<Student[]> {
  
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/students", options)
        .map((response: Response) => response.json());

  }



  addStudent(student: Student): Observable<Student> {
    console.log("we are in the service at addStudent method" + student);
    //console.log(JSON.stringify(student));
      function formatDateString(dateobj : String) {
        if(dateobj.length >=8){
          return dateobj.substring(0,4) + '-'+dateobj.substring(4,6)+ '-'+dateobj.substring(6,8);
        }   
      }

    if(typeof student.studentdob ===  "string"){
      student.studentdob = new Date(formatDateString(student.studentdob));
    }else{
      student.studentdob = new Date(student.studentdob); 
    }
    if(typeof student.fatherdob ===  "string"){
      student.fatherdob = new Date(formatDateString(student.fatherdob));
    }else{  
      student.fatherdob = new Date(student.fatherdob);
    }
    if(typeof student.motherdob ===  "string"){
      student.motherdob = new Date(formatDateString(student.motherdob));
    }else{  
      student.motherdob = new Date(student.motherdob);
    }
    student.startDate = new Date();

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .post(
        this.apiURl + "/api/students",
        JSON.stringify(student),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getStudent(studentId: any): Observable<Student> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/students/"+studentId, options)
        .map((response: Response) => response.json());

  }

  updateStudent(student: Student): Observable<Student> {
    console.log("we are in the service at addStudent method" + student);
    //console.log(JSON.stringify(student));
      function formatDateString(dateobj : String) {
        if(dateobj.length >=8){
          return dateobj.substring(0,4) + '-'+dateobj.substring(4,6)+ '-'+dateobj.substring(6,8);
        }   
      }
    if(typeof student.studentdob ===  "string"){
      student.studentdob = new Date(formatDateString(student.studentdob));
    }else{
      student.studentdob = new Date(student.studentdob); 
    }
    if(typeof student.fatherdob ===  "string"){
      student.fatherdob = new Date(formatDateString(student.fatherdob));
    }else{  
      student.fatherdob = new Date(student.fatherdob);
    }
    if(typeof student.motherdob ===  "string"){
      student.motherdob = new Date(formatDateString(student.motherdob));
    }else{  
      student.motherdob = new Date(student.motherdob);
    }
    
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .put(
        this.apiURl + "/api/students",
        JSON.stringify(student),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getStudentFee(studentId: any): Observable<StudentFee> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentfees/"+studentId, options)
        .map((response: Response) => response.json());

  }

   getWaiversFroStudentFee(studentFeeId: any): Observable<StudentFeeWaiverHistories> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentfees/"+studentFeeId + "/waiver", options)
        .map((response: Response) => response.json());

  }

  getStudentPayment(studentId: any): Observable<StudentFee> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentfees/"+studentId+"/payment", options)
        .map((response: Response) => response.json());

  }


  addStudentPayment(payStudentFee: PayStudentFee): Observable<StudentFee> {
    console.log("we are in the service at addStudent method" + PayStudentFee);
    console.log(JSON.stringify(payStudentFee));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/studentfees/" + payStudentFee.studentFee.studentFeeId + "/payment",
        JSON.stringify(payStudentFee),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  addStudentFine(studentFine: StudentFine): Observable<StudentFee> {
    console.log("we are in the service at Add Fine method" + studentFine);
    console.log(JSON.stringify(studentFine));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/studentfees/" + studentFine.studentFee.studentFeeId + "/addfine",
        JSON.stringify(studentFine),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  addStudentWaiver(studentWaiver: StudentWaiver): Observable<StudentFee> {
    console.log("we are in the service at addwaiver method" + studentWaiver);
    console.log(JSON.stringify(studentWaiver));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/studentfees/" + studentWaiver.studentFee.studentFeeId + "/addwaiver",
        JSON.stringify(studentWaiver),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }
}
