import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductCardModule } from '../product-card/product-card.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    NgxPaginationModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule { }
