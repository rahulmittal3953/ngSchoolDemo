import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { AuthenticationService } from "../services/authentication.service";
import { Class } from "../models/class";

@Injectable()
export class ClassService {
  classData : Class;
  
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) {}

  getClasses(): Observable<Class[]> {
    // add authorization header with jwt token
    let headers = new Headers({
      Authorization: "Bearer " + this.authenticationService.token
    });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http
      .get("/api/listclasses", options)
      .map((response: Response) => response.json());
  }
}
