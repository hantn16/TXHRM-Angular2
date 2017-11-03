import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PostModule } from './post/post.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    PostModule,
    PostCategoryModule,
    MainRoutingModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
