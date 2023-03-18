import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './components/news-card/news-card.component';



@NgModule({
  declarations: [
    NewsCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsCardComponent
  ]
})
export class NewsCardModule { }
