import { Component, OnInit  } from "@angular/core";

import { DashboardService } from "../../services/dashboard.service";
import { NgProgress } from "ngx-progressbar";
import { NotificationsService } from "angular2-notifications";

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

  constructor(
      private dashboardService: DashboardService,
      private ngProgress: NgProgress,
      private notif : NotificationsService
  ) { 
  }
  ngOnInit() {
    this.getDashboardData();
   }
  getDashboardData() {
    this.ngProgress.start();
    window.scroll(0,0);
    this.dashboardService
      .getDashboardData()
      .subscribe(result => {
        this.activeStudents = result.ACTIVE_STUDENTS;
        this.inactiveStudents = result.INACTIVE_STUDENTS;
        this.totalStudents = result.TOTAL_STUDENTS;
        this.newStudents = result.NEW_STUDENTS;
        this.ngProgress.done();
      },
      error =>{
        this.ngProgress.done();
        console.log(error);
        this.notif.error("Failure", "While loading dashboard details, please try again.");
      });
  }
}
