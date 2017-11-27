import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginationModule, ModalModule} from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule,
    Daterangepicker,
    MultiselectDropdownModule,
    UserRoutingModule
  ],
  declarations: [UserComponent],
  providers: [DataService, NotificationService, UploadService]
})
export class UserModule { }
