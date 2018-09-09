import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";


import { serviceBaseURL } from "../models/baseurls";

@Injectable()
export class DashboardService {
  
  apiURl : String = serviceBaseURL;

  constructor(
    private http: Http
  ) {}

  getDashboardData(): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
  
      // get users from api
      return this.http.get(this.apiURl +"/api/overview", options)
        .map((response: Response) => response.json());
  }
}
