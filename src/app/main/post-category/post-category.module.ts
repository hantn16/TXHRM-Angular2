import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCategoryRoutingModule } from './post-category-routing.module';
import { PostCategoryComponent } from './post-category.component';

@NgModule({
  imports: [
    CommonModule,PostCategoryRoutingModule
  ],
  declarations: [PostCategoryComponent]
})
export class PostCategoryModule { }
