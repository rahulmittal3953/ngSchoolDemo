import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent  implements OnInit{
  appTitle = "Admin Console";
  userfullname :any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();\
    const userdetails = JSON.parse(localStorage.getItem("currentUser"));
    this.userfullname = userdetails.username;
    //console.log("header --> "  +userdetails.userfullname);
  }
  logout(){
    console.log("inside logut");
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
