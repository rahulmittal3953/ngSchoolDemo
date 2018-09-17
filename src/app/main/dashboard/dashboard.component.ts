import { Component, OnInit  } from "@angular/core";

import { DashboardService } from "../../services/dashboard.service";

@Component({
  //selector: "app-maincontent",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent  implements OnInit{
	//map = new Map<String, number>();
	activeStudents  = 0;
	inactiveStudents  = 0;
	totalStudents  = 0;
	newStudents = 0;

  constructor( private dashboardService: DashboardService) { 
  }
  ngOnInit() {
    this.getDashboardData();
   }
  getDashboardData() {
    this.dashboardService
      .getDashboardData()
      .subscribe(result => {
        this.activeStudents = result.ACTIVE_STUDENTS;
        this.inactiveStudents = result.INACTIVE_STUDENTS;
        this.totalStudents = result.TOTAL_STUDENTS;
        this.newStudents = result.NEW_STUDENTS;
      },
      error =>{
        console.log(error);
      });
  }
}
