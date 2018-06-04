import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgxMaskModule } from "ngx-mask";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableModule } from 'angular5-data-table';
import { NgProgressModule } from 'ngx-progressbar';

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
import { UpdateClassComponent } from "./main/updateclass/updateclass.component";
import { AddClassComponent } from "./main/addclass/addclass.component";

import { StudentComponent } from "./main/student/student.component";
import { AddStudentComponent } from "./main/addstudent/addstudent.component";
import { UpdateStudentComponent } from "./main/updatestudent/updatestudent.component";
import { StudentDetailComponent } from "./main/studentdetail/studentdetail.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    LoginComponent,
    MainComponent,
    ForgotPasswordComponent,
    SignupComponent,
    DashboardComponent,
    CategoriesComponent,
    UpdateCategoryComponent,
    ClassesComponent,
    UpdateClassComponent,
    AddClassComponent,
    StudentComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    StudentDetailComponent
  ],
  imports: [
      BrowserModule, AppRouting, FormsModule, HttpModule,NgxMaskModule.forRoot(),
      SimpleNotificationsModule.forRoot({
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 100,
        preventDuplicates:true
      }),BrowserAnimationsModule,DataTableModule.forRoot(),
      NgProgressModule
    ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService ,
    StudentService,
    ClassService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
