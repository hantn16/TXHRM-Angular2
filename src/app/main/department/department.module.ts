import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule
  ],
  declarations: [DepartmentComponent]
})
export class DepartmentModule { }
