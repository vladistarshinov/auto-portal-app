import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomePageComponent},
  {path: '403', component: AccessDeniedComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
