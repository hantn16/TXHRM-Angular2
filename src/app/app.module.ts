import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PaginationModule, ModalModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, PaginationModule.forRoot(), ModalModule.forRoot(), AppRoutingModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
