import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    console.log("we are in the service" + username + "--" + password);
    return this.http
      .post(
        "/api/authenticate",
        JSON.stringify({ username: username, password: password })
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        let firstName =  response.json() && response.json().firstName;
        let lastName =  response.json() && response.json().lastName;
        if (token) {
          // set token property
          this.token = token;
          //console.log("auth servie --" + response);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ username: username, token: token, userfullname: firstName + " " +  lastName})
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
