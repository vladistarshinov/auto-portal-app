import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/ui/layout/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
