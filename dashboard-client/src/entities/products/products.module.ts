import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListModule } from './components/product-list/product-list.module';



@NgModule({
  imports: [
    CommonModule,
    ProductListModule
  ],
  exports: [
    ProductListModule
  ]
})
export class ProductsModule { }
