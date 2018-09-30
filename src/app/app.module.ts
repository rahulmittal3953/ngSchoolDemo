import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgxMaskModule } from "ngx-mask";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableModule } from 'angular5-data-table';
import { NgProgressModule } from 'ngx-progressbar';

 import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


// Routing
import { AppRouting } from './app.routing.module';


// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AuthGuard } from './guards/auth.guard';

// Service
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { StudentService } from './services/student.service';
import { ClassService } from './services/class.service';
import { FeeTypeService } from './services/feetype.service';
import { ClassFeeService } from './services/classfee.service';


import { HeaderComponent } from './main/header/header.component';
import { SideNavComponent } from './main/sidenavigation/sidenav.component';

// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';

import { DashboardComponent } from './main/dashboard/dashboard.component';
import { CategoriesComponent } from './main/categories/categories.component';
import { UpdateCategoryComponent } from './main/updatecategory/updatecategory.component';

import { ClassesComponent } from "./main/classes/classes.component";
import { UpdateClassComponent } from "./main/classes/updateclass/updateclass.component";
import { AddClassComponent } from "./main/classes/addclass/addclass.component";
import { ClassDetailComponent } from './main/classes/classdetail/classdetail.component';

import { StudentComponent } from "./main/student/student.component";
import { AddStudentComponent } from "./main/student/addstudent/addstudent.component";
import { UpdateStudentComponent } from "./main/student/updatestudent/updatestudent.component";
import { StudentDetailComponent } from "./main/student/studentdetail/studentdetail.component";

import { FeeTypeComponent } from './main/feetype/feetype.component';
import { AddFeeTypeComponent } from './main/feetype/addfeetype/addfeetype.component';
import { UpdateFeeTypeComponent } from './main/feetype/updatefeetype/updatefeetype.component';
import { FeeTypeDetailComponent } from './main/feetype/feetypedetail/feetypedetail.component';

import { ClassFeeComponent } from './main/classfee/classfee.component';
import { AddClassFeeComponent } from './main/classfee/addclassfee/addclassfee.component';
import { ClassFeeDetailComponent } from './main/classfee/classfeedetail/classfeedetail.component';
import { UpdateClassFeeComponent } from './main/classfee/updateclassfee/updateclassfee.component';

import { GenerateClassFeeComponent } from './main/generateclassfee/generateclassfee.component';
import { GenerateNewStudentFeeComponent } from './main/generateclassfee/generateclassfee.component';
import { DashboardService } from './services/dashboard.service';

import { PromoteStudentComponent } from "./main/promotestudent/promotestudent.component";



@NgModule({
  declarations: [
    AppComponent, HeaderComponent, SideNavComponent, LoginComponent, MainComponent, ForgotPasswordComponent,
    SignupComponent, DashboardComponent, 
    CategoriesComponent, UpdateCategoryComponent,
    ClassesComponent, UpdateClassComponent, AddClassComponent, ClassDetailComponent,
    StudentComponent, AddStudentComponent, UpdateStudentComponent, StudentDetailComponent,
    FeeTypeComponent, AddFeeTypeComponent, UpdateFeeTypeComponent, FeeTypeDetailComponent,
    ClassFeeComponent, AddClassFeeComponent, ClassFeeDetailComponent, UpdateClassFeeComponent,
    GenerateClassFeeComponent, GenerateNewStudentFeeComponent, PromoteStudentComponent
  ],
  imports: [
      BrowserModule, AppRouting, FormsModule, ReactiveFormsModule, HttpModule,NgxMaskModule.forRoot(),
      SimpleNotificationsModule.forRoot({
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 250,
        preventDuplicates:true
      }),BrowserAnimationsModule,DataTableModule.forRoot(),
      NgProgressModule,
      OwlDateTimeModule, 
      OwlNativeDateTimeModule
    ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService ,
    StudentService,
    ClassService,
    FeeTypeService,
    ClassFeeService,
    DashboardService//,
    // providers used to create fake backend
    //fakeBackendProvider,
    //MockBackend,
   // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
