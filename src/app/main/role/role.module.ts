import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginationModule, ModalModule} from 'ngx-bootstrap';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';



@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ModalModule,
    RoleRoutingModule
  ],
  declarations: [RoleComponent],
  providers: [DataService, NotificationService]
})
export class RoleModule { }
