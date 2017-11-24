import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { HomeModule } from './home/home.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { PositionModule } from './position/position.module';
import { UserModule } from './user/user.module';

import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    PostModule,
    PostCategoryModule,
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    UserModule,
    MainRoutingModule
  ],
  declarations: [MainComponent],
  providers: [AuthenService, UtilityService]
})
export class MainModule { }
