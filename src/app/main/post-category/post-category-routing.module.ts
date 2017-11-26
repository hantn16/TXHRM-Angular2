import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCategoryComponent } from './post-category.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: PostCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostCategoryRoutingModule { }
