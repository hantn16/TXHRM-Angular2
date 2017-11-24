import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';
import { DepartmentComponent } from './department/department.component';
import { PostCategoryComponent } from './post-category/post-category.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'post-category', loadChildren: './post-category/post-category.module#PostCategoryModule' },
      { path: 'department', loadChildren: './department/department.module#DepartmentModule' },
      { path: 'position', loadChildren: './position/position.module#PositionModule' },
      { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
      { path: 'post', loadChildren: './post/post.module#PostModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
