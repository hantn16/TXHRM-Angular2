import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionRoutingModule } from './position-routing.module';
import { PositionComponent } from './position.component';

@NgModule({
  imports: [
    CommonModule,
    PositionRoutingModule
  ],
  declarations: [PositionComponent]
})
export class PositionModule { }
