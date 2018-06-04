import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { AuthenticationService } from "../services/authentication.service";
import { Student } from "../models/student";
import { Status } from "../models/status";

@Injectable()
export class StudentService {
  studentData : Student;
  
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) {}

  getStudents(): Observable<Student[]> {
    // add authorization header with jwt token
    let headers = new Headers({
      Authorization: "Bearer " + this.authenticationService.token
    });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http
      .get("/api/students", options)
      .map((response: Response) => response.json());
  }

  addStudent(student: Student): Observable<Status> {
    console.log("we are in the service at addStudent method" + student);
    return this.http
      .post(
        "/api/student",
        JSON.stringify({ student: student })
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      });
  }

}
