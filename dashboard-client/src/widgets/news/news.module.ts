import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { NewsCardModule } from '@/entities/news/news-card.module';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    NewsCardModule
  ],
  exports: [
    NewsComponent
  ]
})
export class NewsModule { }
