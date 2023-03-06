import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductListModule } from '@/entities/products/components/product-list/product-list.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ProductListModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
