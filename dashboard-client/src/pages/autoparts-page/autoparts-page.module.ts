import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutopartsPageComponent } from './autoparts-page.component';
import { ProductListModule } from '@/widgets/product-list/product-list.module';



@NgModule({
  declarations: [
    AutopartsPageComponent
  ],
  imports: [
    CommonModule,
    ProductListModule
  ]
})
export class AutopartsPageModule { }
