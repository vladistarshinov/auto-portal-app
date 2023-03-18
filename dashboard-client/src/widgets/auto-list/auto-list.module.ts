import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoListComponent } from './auto-list.component';
import { AutoCardModule } from '@/entities/auto/components/auto-card/auto-card.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from '@/shared/ui/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoBrandModule } from '@/entities/auto-brand/auto-brand.module';



@NgModule({
  declarations: [
    AutoListComponent
  ],
  imports: [
    CommonModule,
    AutoCardModule,
    NgxPaginationModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AutoBrandModule
  ],
  exports: [
    AutoListComponent
  ]
})
export class AutoListModule { }
