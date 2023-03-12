import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './components/product-card/product-card.module';



@NgModule({
  imports: [
    CommonModule,
    ProductCardModule
  ],
  exports: [
    ProductCardModule
  ]
})
export class ProductsModule { }
