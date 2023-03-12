import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomeModule } from '@/widgets/home/home.module';
import { ProductListModule } from '@/widgets/product-list/product-list.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    ProductListModule
  ],
})
export class HomePageModule { }
