import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCardModule } from './components/auto-card/auto-card.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutoCardModule
  ],
  exports: [
    AutoCardModule
  ]
})
export class AutoModule { }
