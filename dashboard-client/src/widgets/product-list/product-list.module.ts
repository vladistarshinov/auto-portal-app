import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductCardModule } from '../../entities/products/components/product-card/product-card.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '@/shared/ui/pagination/pagination.module';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    NgxPaginationModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule { }
