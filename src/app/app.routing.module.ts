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
import { UpdateClassComponent } from "./main/classes/updateclass/updateclass.component";
import { AddClassComponent } from "./main/classes/addclass/addclass.component";
import { ClassDetailComponent } from './main/classes/classdetail/classdetail.component';

import { StudentComponent } from "./main/student/student.component";
import { AddStudentComponent } from "./main/student/addstudent/addstudent.component";
import { UpdateStudentComponent } from "./main/student/updatestudent/updatestudent.component";
import { StudentDetailComponent } from './main/student/studentdetail/studentdetail.component';

import { FeeTypeComponent } from './main/feetype/feetype.component';
import { AddFeeTypeComponent } from './main/feetype/addfeetype/addfeetype.component';
import { UpdateFeeTypeComponent } from './main/feetype/updatefeetype/updatefeetype.component';
import { FeeTypeDetailComponent } from './main/feetype/feetypedetail/feetypedetail.component';

import { ClassFeeComponent } from './main/classfee/classfee.component';
import { AddClassFeeComponent } from './main/classfee/addclassfee/addclassfee.component';
import { ClassFeeDetailComponent } from './main/classfee/classfeedetail/classfeedetail.component';
import { UpdateClassFeeComponent } from './main/classfee/updateclassfee/updateclassfee.component';

import { GenerateClassFeeComponent , GenerateNewStudentFeeComponent } from './main/generateclassfee/generateclassfee.component';
import { PromoteStudentComponent } from "./main/promotestudent/promotestudent.component";


const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'app', component: MainComponent,  canActivate: [AuthGuard],
      children : [
        
        { path: "categories", component: CategoriesComponent },
        { path: "updatecategory", component: UpdateCategoryComponent },

        { path: "dashboard", component: DashboardComponent },
        
        { path: "student", component: StudentComponent },
        { path: "addstudent", component: AddStudentComponent },
        { path: "updatestudent/:id", component: UpdateStudentComponent },
        { path: "studentdetail/:id", component: StudentDetailComponent },

        { path: "classes", component: ClassesComponent },
        { path: "addclass", component: AddClassComponent },
        { path: "updateclass/:id", component: UpdateClassComponent },
        { path: "classdetail/:id", component: ClassDetailComponent },

        { path: "feetype", component: FeeTypeComponent },
        { path: "addfeetype", component: AddFeeTypeComponent },
        { path: "updatefeetype/:id", component:  UpdateFeeTypeComponent},
        { path: "feetypedetail/:id", component:  FeeTypeDetailComponent},

        { path: "classfee", component: ClassFeeComponent },
        { path: "addclassfee", component: AddClassFeeComponent },
        { path: "classfeedetail/:id", component: ClassFeeDetailComponent },
        { path: "updateclassfee/:id", component: UpdateClassFeeComponent },

        { path: "generateclassfee", component: GenerateClassFeeComponent },
        { path: "generatenewstudentfee", component: GenerateNewStudentFeeComponent },
        {path: "promotestudent", component: PromoteStudentComponent }
        
        
        

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
