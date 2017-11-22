import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionComponent } from './position.component';

const routes: Routes = [
  {path: '', component: PositionComponent, children: [
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
