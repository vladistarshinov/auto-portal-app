import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModule } from './not-found/not-found.module';
import { AccessDeniedModule } from './access-denied/access-denied.module';
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotFoundModule,
    AccessDeniedModule,
    HomePageModule
  ]
})
export class PagesModule { }
