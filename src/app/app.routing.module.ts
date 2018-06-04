import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { ForgotPasswordComponent } from "./forgotpassword/forgotpassword.component";
import { SignupComponent } from "./signup/signup.component";

import { DashboardComponent } from './main/dashboard/dashboard.component';
import { CategoriesComponent } from "./main/categories/categories.component";
import { UpdateCategoryComponent } from "./main/updatecategory/updatecategory.component";

import { ClassesComponent } from "./main/classes/classes.component";
import { UpdateClassComponent } from "./main/updateclass/updateclass.component";
import { AddClassComponent } from "./main/addclass/addclass.component";

import { StudentComponent } from "./main/student/student.component";
import { AddStudentComponent } from "./main/addstudent/addstudent.component";
import { UpdateStudentComponent } from "./main/updatestudent/updatestudent.component";
import { StudentDetailComponent } from './main/studentdetail/studentdetail.component';



const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'app', component: MainComponent,  canActivate: [AuthGuard],
      children : [
        { path: "dashboard", component: DashboardComponent },
        { path: "categories", component: CategoriesComponent },
        { path: "updatecategory", component: UpdateCategoryComponent },
        { path: "classes", component: ClassesComponent },
        { path: "updateclass", component: UpdateClassComponent },
        { path: "addclass", component: AddClassComponent },
        { path: "student", component: StudentComponent },
        { path: "addstudent", component: AddStudentComponent },
        { path: "updatestudent/:id", component: UpdateStudentComponent },
        { path: "studentdetail/:id", component: StudentDetailComponent }
        
      ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations : []
})

export class AppRouting {}
