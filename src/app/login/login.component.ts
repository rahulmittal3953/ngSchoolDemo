import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  title: any = "Your are in login Page";

  model: any = {};
  loading = false;
  error = "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    //this.router.navigate(["/app/dashboard"]);
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          console.log(result);
          this.router.navigate(["/app/dashboard"]);
        } else {
          // login failed
          this.error = "Username or password is incorrect";
          this.loading = false;
        }
      });
  }
}
