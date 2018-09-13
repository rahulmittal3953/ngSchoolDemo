import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgProgress } from 'ngx-progressbar';

import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  title: any = "Your are in login Page";
  loginBtnTxt = 'Login';

  model: any = {};
  loading = false;
  error = "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngProgress: NgProgress
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loginBtnTxt = 'Loading...';
    this.loading = true;
    //this.router.navigate(["/app/dashboard"]);
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(result => {
        this.loginBtnTxt = 'Login';
        if (result === true) {
          // login successful
          //console.log(result);
          this.ngProgress.done();
          this.router.navigate(["/app/dashboard"]);
        } else {
          // login failed
          this.ngProgress.done();
          this.error = "Username or password is incorrect";
          this.loading = false;
        }
      },
      (err) => { 
        //console.log('error', err) 
        this.ngProgress.done();
        this.error = "Username or password is incorrect";
        this.loginBtnTxt = 'Login';
    }
    );
  }
}
