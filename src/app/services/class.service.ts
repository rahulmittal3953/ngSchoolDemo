import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { Class } from "../models/class";
import { StudentClass } from "../models/studentclass";
import { serviceBaseURL } from "../models/baseurls";

@Injectable()
export class ClassService {
  classData : StudentClass;
  apiURl : String = serviceBaseURL;
  
  constructor(
    private http: Http
  ) {}

  getClasses(): Observable<StudentClass[]> {
    console.log("we are in the service at Get Class method");
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentclass", options)
        .map((response: Response) => {
          console.log(response.json())
          return response.json();
        });
  }

  addClass(studentClass: StudentClass): Observable<StudentClass> {
    console.log("we are in the service at studentClass method" + studentClass);
    console.log(JSON.stringify(studentClass));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/studentclass",
        JSON.stringify(studentClass),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getClass(StudentClassId: any): Observable<StudentClass> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/studentclass/"+StudentClassId, options)
        .map((response: Response) => response.json());

  }

  updateClass(studentClass: StudentClass): Observable<StudentClass> {
    console.log("we are in the service at studentClass method" + studentClass);
    console.log(JSON.stringify(studentClass));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .put(
        this.apiURl + "/api/studentclass",
        JSON.stringify(studentClass),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }
}
