import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './news-page.component';
import { NewsModule } from '@/widgets/news/news.module';



@NgModule({
  declarations: [
    NewsPageComponent
  ],
  imports: [
    CommonModule,
    NewsModule
  ]
})
export class NewsPageModule { }
