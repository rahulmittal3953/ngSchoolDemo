import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { ClassFeeType } from "../models/ClassFeeType";

@Injectable()
export class FeeTypeService {
  feeType : ClassFeeType;
  apiURl : String = "http://localhost:8080";
  
  constructor(
    private http: Http
  ) {}

  getFeeTypes(): Observable<ClassFeeType[]> {
    console.log("we are in the service at Get FeeTypeService method");
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/feetype", options)
        .map((response: Response) => {
          console.log(response.json())
          return response.json();
        });
  }

  addFeeType(classFeeType: ClassFeeType): Observable<ClassFeeType> {
    console.log("we are in the service at studentClass method" + classFeeType);
    console.log(JSON.stringify(classFeeType));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        this.apiURl + "/api/feetype",
        JSON.stringify(classFeeType),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }

  getFeeType(id: any): Observable<ClassFeeType> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http
        .get(this.apiURl +"/api/feetype/"+id, options)
        .map((response: Response) => response.json());

  }

  updateFeeType(classFeeType: ClassFeeType): Observable<ClassFeeType> {
    console.log("we are in the service at studentClass method" + classFeeType);
    console.log(JSON.stringify(classFeeType));

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });


    return this.http
      .put(
        this.apiURl + "/api/feetype",
        JSON.stringify(classFeeType),
        options
      ).map((response: Response) => {
        // login successful if there's a jwt token in the response
        return response.json();
      })
  }
}
