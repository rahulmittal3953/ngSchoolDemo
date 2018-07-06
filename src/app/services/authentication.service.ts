import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { AppUser } from "../models/appuser";

@Injectable()
export class AuthenticationService {
  public token: string;
  apiURl : String = "http://localhost:8080";
  public appuser : AppUser;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    console.log("we are in the service" + username + "--" + password);
    
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    this.appuser = { id: '', username: username, 
      password: password, email: 'abc@abc.com',userId : username,
      userType: 'W658789798ASAS'};


    return this.http
      .post(
        this.apiURl+"/api/users/login",
        JSON.stringify(this.appuser),
        options
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        //let token = response.json() && response.json().token;
        //let firstName =  response.json() && response.json().firstName;
        //let lastName =  response.json() && response.json().lastName;
        this.appuser = response.json();
        if (this.appuser.userType) {
          // set token property

          //console.log("auth servie --" + response);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            //JSON.stringify({ username: username, token: this.appuser.token, userfullname: this.appuser.userFullName})
            JSON.stringify(this.appuser)
          );

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem("currentUser");
  }
}
