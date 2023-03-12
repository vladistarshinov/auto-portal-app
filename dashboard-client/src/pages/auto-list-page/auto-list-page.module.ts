import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoListPageComponent } from './auto-list-page.component';
import { AutoListModule } from '@/widgets/auto-list/auto-list.module';


@NgModule({
  declarations: [
    AutoListPageComponent
  ],
  imports: [
    CommonModule,
    AutoListModule
  ]
})
export class AutoListPageModule { }
