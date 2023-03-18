import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AutoListPageComponent } from './auto-list-page/auto-list-page.component';
import { AutopartsPageComponent } from './autoparts-page/autoparts-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesModule } from './pages.module';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomePageComponent},
  {path: 'autoparts', component: AutopartsPageComponent},
  {path: 'auto-list', component: AutoListPageComponent},
  {path: 'news', component: NewsPageComponent},
  {path: '403', component: AccessDeniedComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesModule],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
