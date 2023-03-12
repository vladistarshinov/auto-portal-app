import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundModule } from './not-found/not-found.module';
import { AccessDeniedModule } from './access-denied/access-denied.module';
import { HomePageModule } from './home-page/home-page.module';
import { AutopartsPageModule } from './autoparts-page/autoparts-page.module';
import { AutoListPageModule } from './auto-list-page/auto-list-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotFoundModule,
    AccessDeniedModule,
    HomePageModule,
    AutopartsPageModule,
    AutoListPageModule
  ]
})
export class PagesModule { }
